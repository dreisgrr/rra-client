import './adminsitesitem.css'
import agtTower from "../../../resources/sites-images/agt-tower.jpg"
import glastTower from "../../../resources/sites-images/glas-tower.jpg"
import oneFintechTower from "../../../resources/sites-images/one-fintech-tower.PNG"
import smStrata from "../../../resources/sites-images/sm-strata.png"
import { SITE_NAMES } from "../../../utils/definitions"

const AdminSitesItem = ({item, handleUpdate}) => {
    
    return (
        <div className="adminSitesItem">
            <img src={item.name === SITE_NAMES.AGT ? agtTower : item.name === SITE_NAMES.GLAS ? glastTower : item.name === SITE_NAMES.OFT ? oneFintechTower : smStrata} alt="" className="asiImg"/>
            <div className="asiDesc">
                <h1 className="asiTitle">{item.title}</h1>
                <span className="asiLocation">{item.location}</span>
                <span className="asiAddress">{item.address}</span>
                <span className="asiContact">{item.contactNumber}</span>
                <span className="asiRoomCount">Spaces: {item.rooms.length}</span>
            </div>
            <div className="asiDetails">
                <button className="asiUpdateBtn" onClick={ ()=>handleUpdate(item)}>Update</button>
            </div>
        </div>
    )
}

export default AdminSitesItem
