import './searchBar.css'
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLocationDot, faCalendarDays, faUserGroup } from "@fortawesome/free-solid-svg-icons"
import { Calendar } from "react-date-range"
import { format } from "date-fns";
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'


const SearchBar = ({activeIndex, view, passAction}) => {
    const { user } = useContext(AuthContext)
    const [site, setSite] = useState("63b56fea41184440f9f90696");
    const [toggleDatePicker, setToggleDatePicker] = useState(false)
    const [date, setDate] = useState(
        {
            date: new Date(),
            key: 'selection'
        }
    );
    const [toggleOptions, setToggleOptions] = useState(false)
    const [options, setOptions] = useState({
        pax: 1
    });
    
    const today = new Date()
    const [duration, setDuration] = useState(1);

    const navigate = useNavigate();

    const handleOption = (name, operation) => {
        setOptions( prev => {
            return { ...prev, [name]: operation === "+" ? options[name] +1 : options[name] -1}
        })
    }
    const handleSelect = (name, value) => {
        setDate( prev => {
            return { ...prev,[name]: value}
        })
        setToggleDatePicker(!toggleDatePicker)
    }
    const [time, setTime] = useState('');
    const [hours, setHours] = useState([]);
    const generateHours = () => {
        let hoursDef = [];
        let tempHours = '';
        for (let ctrHour = 0; ctrHour < 24; ctrHour++) {
            today.setMinutes("00")
            if (ctrHour < 13) {
                today.setHours(ctrHour)
                tempHours = (ctrHour < 10 ? '0' : '') + ctrHour;
                if (tempHours === "00") tempHours = '12'; 
                tempHours = ctrHour === 12 ? `${tempHours}:00 PM` : `${tempHours}:00 AM`
            }
            else {
                today.setHours(ctrHour-12)
                let pmHour = ctrHour-12;
                tempHours = (pmHour < 10 ? '0' : '') + pmHour;
                tempHours = `${tempHours}:00 PM`
            }
            hoursDef.push(`${tempHours}`)
            //console.log(hoursDef)
        }
        setHours(hoursDef);
    }
    useEffect( () => {
        const onPageLoad = () => {
            generateHours();
        };
        if (document.readyState === 'complete') {
            onPageLoad();
        } else {
            window.addEventListener('load', onPageLoad);
            return () => window.removeEventListener('load', onPageLoad);
        }
    }, [])
    useEffect( () => {
        setTime(today.getHours() + 1)
    }, [hours])
    useEffect( () => {
        if(activeIndex === 2 || activeIndex === 3) {
            setOptions( prev => {
                return { ...prev, pax: 1}
            })
        }
    }, [activeIndex])

    const checkAvailability = (requestStart, requestEnd) => {
        let dateReqStartTime = new Date(requestStart)
        let dateReqEndTime = new Date(requestEnd)

        let bookedStartTime = new Date()
        let bookedEndTime = new Date()

        bookedStartTime.setHours(9)
        bookedStartTime.setMinutes(0)
        bookedStartTime.setSeconds(0)
        bookedEndTime.setHours(15)
        bookedEndTime.setMinutes(0)
        bookedEndTime.setSeconds(0)

        console.log('booked start time: ', bookedStartTime)
        console.log('request end time: ', dateReqEndTime)

        if((bookedStartTime.getTime() < dateReqStartTime.getTime() && (bookedEndTime.getTime() < dateReqStartTime.getTime() || bookedEndTime.getTime() === dateReqStartTime.getTime()) 
        || (bookedStartTime.getTime() > dateReqStartTime.getTime() && (bookedStartTime.getTime() > dateReqEndTime.getTime() || bookedStartTime.getTime() === dateReqEndTime.getTime())))) {
            return true;
        }
        else {
            return false;
        }
    }
    
    const handleSearch = () => {
        let search = ''
        switch (activeIndex) {
            case 0: search = 'conference' 
                break;
            case 1: search = 'training'
                break;
            case 2: search = 'gym'
                break;
            case 3: search = 'sleeping'
                break;
        
            default: search = 'conference'
                break;
        }

        // console.log(`site : ${site}`)
        // console.log("date", date);
        console.log(`start time : ${time}`)
        let requestStartTime = new Date(date.date);
        let requestEndTime = new Date(date.date);
        console.log("date date: ", date.date)
        console.log("requestStartTime ", requestStartTime)
        let endTime = Number(time) + Number(duration);
        let computedStartTime = Number(time) === 24 ? 0 : time
        
        requestStartTime.setMinutes(0);
        requestStartTime.setSeconds(0);
        requestStartTime.setHours(time);
        //requestStartTime.setDate(date);
        
        requestEndTime.setMinutes(0);
        requestEndTime.setSeconds(0);
        requestEndTime.setHours(endTime);

        console.log("request start: ", requestStartTime)
        console.log("request start millis: ", requestStartTime.getTime())
        console.log("request end", requestEndTime)
        console.log("request end millis", requestEndTime.getTime())
        
        requestStartTime = requestStartTime.getTime();
        requestEndTime = requestEndTime.getTime()
        
        //let isAvailable = checkAvailability(requestStartTime, requestEndTime)
        //console.log("isAvailable", isAvailable);
        console.log(`site : ${site}`)
        console.log(`date : ${date.date}`)
        console.log(`time : ${computedStartTime}`)
        console.log(`requestStartTime : ${requestStartTime}`)
        console.log(`requestEndTime : ${requestEndTime}`)
        console.log("options", options);
        console.log(`duration : ${duration}`)
        console.log(`search : ${search}`)
        
        if (user?.permissions.isAdmin) {
            passAction('loadSearchResult', {state:{ site, date, computedStartTime, requestStartTime, requestEndTime, options, duration, search}})
        }
        else {
            navigate("/search", {state:{ site, date, computedStartTime, requestStartTime, requestEndTime, options, duration, search}})
        }
    }

    return (
        <div className={view === 'admin' ? "searchBarContainer admin" : "searchBarContainer"}>
        <div className={view === 'admin' ? "headerSearch admin" : "headerSearch"}> 
            <div className="headerSearchItem">
                <FontAwesomeIcon icon={ faLocationDot } className="headerIcon" />
                <select className="headerSearchSelect" id="selectSite" onChange={(e) => setSite(e.target.value) }>
                    <option defaultValue="true" className="headerSearchOptions" value="63b56fea41184440f9f90696">AGT</option>
                    <option className="headerSearchOptions" value="63b56f2241184440f9f90694">GLAS</option>
                    <option className="headerSearchOptions" value="63b570b7b9b00d78455bf72d">OFT</option>
                    <option className="headerSearchOptions" value="63b570f8b9b00d78455bf72f">SMS</option>
                </select>
            </div>
            <div className="headerSearchItem">
                <FontAwesomeIcon icon={ faCalendarDays } className="headerIcon" />
                <span onClick={()=> setToggleDatePicker(!toggleDatePicker)} className="headerSearchText">{`${format(date.date, "dd MMM yyyy")}`}</span>
                { toggleDatePicker && 
                    // <DateRange 
                    //     editableDateInputs={true}
                    //     onChange ={item => setDate([item.selection])}
                    //     moveRangeOnFirstSelection={false}
                    //     ranges={date}
                    //     minDate={new Date()}
                    //     className='dateRange'
                    // />
                    <Calendar 
                        date={date.date}
                        minDate={new Date()}
                        onChange={(e) => handleSelect("date", e )}
                        editableDateInputs={true}
                        className='dateRange'
                    />
                }
            </div>
            <div className="headerSearchItem">
                <label>Start Time</label>
                <select 
                    className="headerSearchSelect" 
                    id="selectFromTime" 
                    onLoadedData={(e) => setTime(e.target.value)} 
                    onChange={(e) => setTime(e.target.value) }
                    defaultValue={ hours[(today.getHours() + 1)]}
                    >
                    {
                        hours ? 
                            hours.map((item, i) => (
                                <option key={i} value={i} selected={ (today.getHours() + 1) === i} >{item}</option>
                            )
                            )
                    : ''}
                </select>
            </div>
            <div className="headerSearchItem">
                <label>Duration</label>
                <select className="headerSearchSelect" defaultValue="1" id="selectDuration" onChange={(e) => setDuration(e.target.value)}> 
                                <option value="1">1 hr</option>
                                <option value="2">2 hrs</option>
                                <option value="3">3 hrs</option>
                                <option value="4">4 hrs</option>
                </select>
            </div>
            <div className="headerSearchItem">
                <FontAwesomeIcon icon={ faUserGroup } className="headerIcon" />
                <span onClick={ ()=> setToggleOptions(!toggleOptions)} className="headerSearchText">{`${options.pax} pax`}</span>
                { toggleOptions && 
                    <div style={ activeIndex === 2 || activeIndex === 3  ? {display: 'none'} : {display: 'flex'}}  className="options"onBlur={()=> setToggleOptions(!toggleOptions)}>
                        <div className="optionItem">
                            <span className="optionText">Pax</span>
                            <div className="optionCounter">
                                <button disabled={options.pax <= 1} className="optionCounterButton" onClick={ ()=> handleOption("pax", "-")}>-</button>
                                <span className="optionCounterNumber">{options.pax}</span>
                                <button disabled={options.pax >= 35}className="optionCounterButton" onClick={ ()=> handleOption("pax", "+")}>+</button>
                            </div>
                        </div>
                    </div> 
                }
            </div>
            <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>Search</button>
            </div>
            {/* <TimePicker 
                format="HH:mm a" 
                minDate={new Date()} 
                value={new Date()} 
                onChange={setTime} 
                value={time} 
            /> */}
        </div> 
        </div>
    )
}

export default SearchBar
