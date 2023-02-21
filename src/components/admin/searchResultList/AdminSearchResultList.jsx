import './adminsearchresultlist.css'
import useFetch from '../../../hooks/useFetch';
import SearchItem from '../../searchItem/SearchItem';
import { useState } from 'react';
import ReservationForm from '../../reservationForm/ReservationForm';
import { useEffect } from 'react';

const AdminSearchResultList = ({searchQuery}) => {
    const [openReservationModal, setOpenReservationModal] = useState(false)
    const [selectedRoomToReserve, setSelectedRoomToReserve] = useState({});
    const handleReserve = (room) => {
        setOpenReservationModal(true)
        setSelectedRoomToReserve(room);
    }
    
    const today = new Date()
    const [hours, setHours] = useState([]);
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

    const { data, loading, error } = useFetch(`/rooms/getavailable?siteId=${searchQuery.state.site}&facilityType=${searchQuery.state.search}&capacity=${searchQuery.state.options.pax}&requestStart=${searchQuery.state.requestStartTime}&requestEnd=${searchQuery.state.requestEndTime}`);

    console.log(data)
    return (
        <div className="asrListContainer">
            <div className="asrListWrapper">
            <h4 className="asrListTitle">Search Result ({data.length})</h4>
                <div className="asrList">
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
                <ReservationForm selectedRoom={selectedRoomToReserve} openReservationModal={setOpenReservationModal} requestDetails={searchQuery.state} hoursDef={hours}/>
            }
        </div>
    )
}

export default AdminSearchResultList
