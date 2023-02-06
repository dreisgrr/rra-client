import './reservationslistitem.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { format } from "date-fns";
import conferenceStockPhoto from "../../resources/AGT/images/conference-room-stock-photo.jpg"
import trainingStockPhoto from "../../resources/AGT/images/training-room-stock-photo.jpg"
import gymStockPhoto from "../../resources/AGT/images/gym-stock-photo.jpg"
import sleepingStockPhoto from "../../resources/AGT/images/sleeping-quarters-stock-photo2.jpg"
import { faDumbbell, faBed, faUsersBetweenLines, faPersonChalkboard } from "@fortawesome/free-solid-svg-icons"
import useFetch from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';

const ReservationsListItem = ({item}) => {
    const navigate = useNavigate();
    const roomId = item.roomId;
    const reservation = item;
    const { data, loading, error } = useFetch(`/rooms/${roomId}`)
    const handleViewDetails = (e) => {
        e.preventDefault();
        navigate(`/reservations/${item._id}`, {state:{ roomId, reservation}})
    }
    //console.log(data);
    return (
        <div className="rlListItem">
            <h4>{item.siteId === '63b56fea41184440f9f90696' ? 'AGT' : item.siteId === '63b56f2241184440f9f90694' ? 'GLAS' : item.siteId === '63b570b7b9b00d78455bf72d' ? 'OFT' : 'SMS'}</h4>
            <div className="rlListItemType">
                <FontAwesomeIcon className="rlListItemTypeImg" icon={ item.facilityType === "conference" ? faUsersBetweenLines : item.facilityType === "training" ? faPersonChalkboard : item.facilityType === "gym" ? faDumbbell : faBed} />
                <span>{item.facilityType === 'conference' ? "Conference Room" : item.facilityType === 'training' ? 'Training Room' : item.facilityType === 'gym' ? 'Gym' : 'Sleeping Quarters'}</span>
            </div>
            {/* <span>{`${format(new Date(item.reservationStartTime), "MM/dd/yyyy")}`}</span>
            <span>{`${format(new Date(item.reservationStartTime), "HH:mm")}`} -- {`${format(new Date(item.reservationEndTime), "HH:mm")}`}</span> */}
            <div className="rlListItemBox">
                <img src={item.facilityType === 'conference' ? conferenceStockPhoto : item.facilityType === 'training' ? trainingStockPhoto : item.facilityType === 'gym' ? gymStockPhoto : sleepingStockPhoto} alt="" className="rlListItemBoxImg"/>
                <div className="rlListItemBoxDesc">
                    <span className="rlListItemDates">{`${format(new Date(item.reservationStartTime), "MMM dd yyyy")}`}|{`${format(new Date(item.reservationStartTime), "p")}`}–{`${format(new Date(item.reservationEndTime), "p")}`}</span>
                    <h4 className="rlListItemBoxName">{data.name}</h4>    
                    <span className="rlListItemSubtitle">{data.description}</span>
                    <label>{item.reservationStatus}</label>
                </div>
                <div className="rlListItemDetails">
                    <button className="rlListItemDetailsBtn" onClick={handleViewDetails}>Details</button>
                </div>
            </div>
        </div>
    )
}

export default ReservationsListItem
