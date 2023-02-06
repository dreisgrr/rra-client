import './roomListItem.css'
import conferenceStockPhoto from "../../../resources/AGT/images/conference-room-stock-photo.jpg"
import trainingStockPhoto from "../../../resources/AGT/images/training-room-stock-photo.jpg"
import gymStockPhoto from "../../../resources/AGT/images/gym-stock-photo.jpg"
import sleepingStockPhoto from "../../../resources/AGT/images/sleeping-quarters-stock-photo2.jpg"

const RoomListItem = ({item, handleUpdate}) => {
    return (
        <div className="roomListItem">
            <img src={item.facilityType === 'conference' ? conferenceStockPhoto : item.facilityType === 'training' ? trainingStockPhoto : item.facilityType === 'gym' ? gymStockPhoto : sleepingStockPhoto} alt="" className="rliImg"/>
            <div className="rliDesc">
                <h1 className="rliName">{item?.name}</h1>
                <span className="rliSubtitle">{item?.description}</span>
                <label>{item.isRestricted === false ? 'Available' : 'Restricted'}</label>
                {
                    item?.features?.withCisco === false ? '' : 
                    <>
                        <label>Features: CISCO Equipped </label>
                        {/* <span className="rliFeatures">With CISCO</span>*/}
                    </> 
                }
                <label>Floor: {item?.floor}</label>
                <label>Capacity: {item?.capacity}</label>
            </div>
            <div className="rliDetails">
                <button className="rliUpdateBtn" onClick={ ()=>handleUpdate(item)}>Update</button>
            </div>
        </div>
    )
}

export default RoomListItem
