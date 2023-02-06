import "./searchItem.css"
import conferenceStockPhoto from "../../resources/AGT/images/conference-room-stock-photo.jpg"
import trainingStockPhoto from "../../resources/AGT/images/training-room-stock-photo.jpg"
import gymStockPhoto from "../../resources/AGT/images/gym-stock-photo.jpg"
import sleepingStockPhoto from "../../resources/AGT/images/sleeping-quarters-stock-photo2.jpg"

const SearchItem = ({room, handleReserve}) => {
    return (
        <div className="searchItem">
            <img
                src={room.facilityType === 'conference' ? conferenceStockPhoto : room.facilityType === 'training' ? trainingStockPhoto : room.facilityType === 'gym' ? gymStockPhoto : sleepingStockPhoto}
                alt=""
                className="searchItemImg"
            />
            <div className="searchItemDesc">
                <h1 className="searchItemName">{room.name}</h1>
                <span className="searchItemSubtitle">
                    {room.description}
                </span>
                <label>{room.isRestricted === false ? 'Available' : 'Restricted'}</label>
                {
                    room?.features?.withCisco === false ? '' : 
                    <>
                        <label>Features: CISCO Equipped </label>
                        {/* <span className="rliFeatures">With CISCO</span>*/}
                    </> 
                }
                <label>Floor: {room.floor}</label>
                <label>Capacity: {room.capacity}</label>
            </div>
            <div className="searchItemDetails">
                <button className="searchItemReserveBtn" onClick={ ()=>handleReserve(room)}>Reserve</button>
            </div>
        </div>
    )
}

export default SearchItem
