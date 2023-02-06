import "./headerListItem.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDumbbell, faBed, faUsersBetweenLines, faPersonChalkboard } from "@fortawesome/free-solid-svg-icons"

const HeaderListItem = ({type, active, changeType, view}) => {
    const typesDefinition = [
        {type: 'conference', display: 'Conference Room'},
        {type: 'training', display: 'Training Room'},
        {type: 'gym', display: 'Gym'},
        {type: 'sleeping', display: 'Sleeping Quarters'},
    ]
    
    const obj = typesDefinition.find(x => x.type === type)

    return (
        // <div className={active == true ? "headerListItem active": "headerListItem"} onClick={ ()=> handleChangeType(type)} >
        <div className={active === true ? view === "admin" ? "headerListItem admin active": "headerListItem active" : view === "admin" ? "headerListItem admin" : "headerListItem" } onClick={ changeType } >
            <FontAwesomeIcon icon={ type === "conference" ? faUsersBetweenLines : type === "training" ? faPersonChalkboard : type === "gym" ? faDumbbell : faBed} />
            <span>{obj.display}</span>
        </div>
    )
}

export default HeaderListItem
