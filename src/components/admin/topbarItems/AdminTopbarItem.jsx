import './admintopbaritem.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFileSignature, faPenToSquare, faBuilding, faPersonChalkboard } from "@fortawesome/free-solid-svg-icons"

const AdminTopbarItem = ({title, active, type, changeType}) => {
    
    return (
        <div className={active === true ? "topbarItem active": "topbarItem"} onClick={ changeType }>
            <FontAwesomeIcon icon={ type === "reservations" ? faFileSignature : type === "search" ? faPenToSquare : type === "sites" ? faBuilding : faPersonChalkboard} />
            <span>{title}</span>
        </div>
    )
}

export default AdminTopbarItem
