import './adminsitesitem.css'
import agtTower from "../../../resources/sites-images/agt-tower.jpg"
import glastTower from "../../../resources/sites-images/glas-tower.jpg"
import oneFintechTower from "../../../resources/sites-images/one-fintech-tower.PNG"
import smStrata from "../../../resources/sites-images/sm-strata.png"

const AdminSitesItem = ({item, handleUpdate}) => {
    
    return (
        <div className="adminSitesItem">
            <img src={item.title === 'AGT' ? agtTower : item.title === 'GLAS Tower' ? glastTower : item.title === 'One Fintech' ? oneFintechTower : smStrata} alt="" className="asiImg"/>
            <div className="asiDesc">
                <h1 className="asiTitle">{item.title}</h1>
                <span className="asiLocation">{item.location}</span>
                <span className="asiAddress">{item.address}</span>
                <span className="asiContact">{item.contactNumber}</span>
                <span className="asiRoomCount">Rooms: {item.rooms.length}</span>
            </div>
            <div className="asiDetails">
                <button className="asiUpdateBtn" onClick={ ()=>handleUpdate(item)}>Update</button>
            </div>
        </div>
    )
}

export default AdminSitesItem
