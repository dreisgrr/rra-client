import "./searchResultList.css"
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import SearchItem from "../searchItem/SearchItem";
import { Calendar } from "react-date-range"
import useFetch from "../../hooks/useFetch";
import ReservationForm from "../reservationForm/ReservationForm";

const SearchResultList = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [site, setSite] = useState(location.state.site)
    const [date, setDate] = useState(location.state.date)
    const [time, setTime] = useState(location.state.computedStartTime);
    const [requestStartTime, setRequestStartTime] = useState(location.state.requestStartTime)
    const [requestEndTime, setRequestEndTime] = useState(location.state.requestEndTime)
    const [duration, setDuration] = useState(location.state.duration);
    const [options, setOptions] = useState(location.state.options)
    const [searchType, setSearchType] = useState(location.state.search)
    console.log(location.state)
    const today = new Date()
    
    const [hours, setHours] = useState([]);

    const [toggleDatePicker, setToggleDatePicker] = useState(false)

    const [openReservationModal, setOpenReservationModal] = useState(false)
    const [selectedRoomToReserve, setSelectedRoomToReserve] = useState({});
    const handleReserve = (room) => {
        setOpenReservationModal(true)
        setSelectedRoomToReserve(room);
    }

    const handleOption = (name, value) => {
        setOptions( prev => {
            return { ...prev, [name]: value}
        })

    }
    const handleSelect = (name, value) => {
        generateHours()
        setDate( prev => {
            return { ...prev,[name]: value}
        })
        setToggleDatePicker(!toggleDatePicker)
    }

    const generateHours = () => {
        let hoursDef = [];
        let tempHours = '';
        for (let ctrHour = 0; ctrHour < 24; ctrHour++) {
            //today.setMinutes("00")
            if (ctrHour < 13) {
                today.setHours(ctrHour)
                tempHours = (ctrHour < 10 ? '0' : '') + ctrHour;
                if (tempHours === "00") tempHours = '12'; 
                tempHours = ctrHour === 12 ? `${tempHours}:00 PM` : `${tempHours}:00 AM`
            }
            else {
                //today.setHours(ctrHour-12)
                let pmHour = ctrHour-12;
                tempHours = (pmHour < 10 ? '0' : '') + pmHour;
                tempHours = `${tempHours}:00 PM`
            }
            hoursDef.push(`${tempHours}`)
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
    console.log(`/rooms/getavailable?siteId=${site}&facilityType=${searchType}&capacity=${options.pax}&requestStart=${requestStartTime}&requestEnd=${requestEndTime}`)
    const { data, loading, error } = useFetch(`/rooms/getavailable?siteId=${site}&facilityType=${searchType}&capacity=${options.pax}&requestStart=${requestStartTime}&requestEnd=${requestEndTime}`);
    console.log('error', error)
    const goHome = (e) => {
        e.preventDefault()
        navigate('/');
    }
    
    return (
            <div className="searchResultListContainer">
                <div className="searchResultListWrapper">
                    <div className="listSearch">
                        <h1 className="listTitle">Search Result</h1>
                        <div className="listItem">
                            <label>Site</label>
                            <span>{site === '63b56fea41184440f9f90696' ? 'AGT' : site === '63b56f2241184440f9f90694' ? 'GLAS' : site === '63b570b7b9b00d78455bf72d' ? 'OFT' : 'SMS'}</span>
                            {/* <select className="searchResultSelect" id="selectSite" onChange={(e) => setSite(e.target.value) }>
                                <option selected={site === 'AGT'} className="searchResultOptions">AGT</option>
                                <option selected={site === 'GLAS'} className="searchResultOptions">GLAS</option>
                                <option selected={site === 'OFT'} className="searchResultOptions">OFT</option>
                                <option selected={site === 'SMS'} className="searchResultOptions">SMS</option>
                            </select> */}
                            {/* <input type="text" placeholder={site}></input> */}
                        </div>
                        <div className="listItem">
                            <label>Reservation Date</label>
                            <span>{`${format(date.date, "MM/dd/yyyy")}`}</span>
                            {/* <span onClick={()=> setToggleDatePicker(!toggleDatePicker)}>
                                {`${format(date.date, "MM/dd/yyyy")}`}
                            </span> */}
                            { toggleDatePicker && 
                                // <DateRange 
                                //     onChange={(item) => setDate([item.selection])} 
                                //     minDate={new Date()} 
                                //     ranges={date}
                                // /> 
                                <Calendar 
                                    date={date.date}
                                    minDate={new Date()}
                                    onChange={(e) => handleSelect("date", e )}
                                    editableDateInputs={false}
                                />
                            } 
                        </div>
                        <div className="listItem">
                            <div className="listOptionWrapper">
                                <div className="listOptionItem">
                                    <span className="listOptionText">Start Time</span>
                                    <span>{`${hours[time]}`}</span>
                                    {/* <select className="headerSearchFromTime" id="selectFromTime" onChange={(e) => setTime(e.target.value) }>
                                    {
                                        hours ? 
                                            hours.map((item, i) => (
                                                <option key={i} value={item} selected={ item === time}>{item}</option>
                                            )
                                            )
                                    : ''}
                                    </select> */}
                                </div>
                                <div className="listOptionItem">
                                    <span className="listOptionText">Duration</span>
                                    <span>{ duration === 1 ? `${duration} hour` : `${duration} hours`}</span>
                                    {/* <select className="headerSearchDuration" id="selectDuration" onChange={(e) => setDuration(e.target.value)}> 
                                        <option value="1" selected={duration === '1'}>1 hr</option>
                                        <option value="2" selected={duration === '2'}>2 hrs</option>
                                        <option value="3" selected={duration === '3'}>3 hrs</option>
                                        <option value="4" selected={duration === '4'}>4 hrs</option>
                                    </select> */}
                                </div>
                                <div className="listOptionItem">
                                    <span className="listOptionText">Pax</span>
                                    <span>{options.pax}</span>
                                    {/* <input type="number" min="1" max="35" placeholder={options.pax} 
                                    onChange={
                                        e => handleOption("pax", e.target.value)} value={options.pax} className="listOptionInput"/> */}
                                </div>
                            </div>
                        </div>
                        <button onClick={goHome}>Back</button>
                    </div>
                    <div className="listResult">
                        { 
                            loading ? 
                                "Loading" : 
                                    error ?
                                        <>
                                            <span>{error.message}</span><br/>
                                            <span>Contact System Administrator</span>
                                        </> :
                                            Object.keys(data).length === 0 ?
                                                "No matches found" :
                                                    <> 
                                                        {data.map((item) => (
                                                        <SearchItem 
                                                            key={item._id} 
                                                            room={item}
                                                            handleReserve={handleReserve}
                                                        />
                                                        ))}
                                                    </>
                        }
                    </div>
                </div>
                { openReservationModal && 
                    <ReservationForm selectedRoom={selectedRoomToReserve} openReservationModal={setOpenReservationModal} requestDetails={location.state} hoursDef={hours}/>
                }
                
            </div>
            
    )
}

export default SearchResultList
