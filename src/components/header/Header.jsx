import "./header.css"


import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useNavigate } from "react-router-dom"
import HeaderListItem from "../headerListItem/HeaderListItem.jsx"
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Header = ({ passActive, view }) => {
    const { user } = useContext(AuthContext);
    //const defaultActive = (user?.permissions?.isAdmin || user?.permissions?.isManager) ? 0 : user?.permissions?.isWorkforce ? 1 : 2;
    const [activeIndex, setActiveIndex] = useState(2);

    const navigate = useNavigate();
    
    const handleChangeType = (index) => {
        setActiveIndex(index)
        passActive(index);
        if(view != 'admin') navigate("/");
    }
    return (
        <div className={view === "admin" ? "header admin" : "header"} style={ user ? {display: "flex"} : {display: "none"}}>
            <div className={ "headerContainer" }>
                <div className="headerList">
                    <HeaderListItem active={activeIndex === 2} view={view} type={"gym"} changeType={ ()=> handleChangeType(2)}/>
                    <HeaderListItem active={activeIndex === 3} view={view} type={"sleeping"} changeType={ ()=> handleChangeType(3)}/>
                    { (user?.permissions?.isManager || user?.permissions?.isAdmin) ?  <HeaderListItem active={activeIndex === 0} view={view} type={"conference"} changeType={ ()=> handleChangeType(0)}/> : ''}
                    { (user?.permissions?.isManager || user?.permissions?.isAdmin || user?.permissions?.isWorkforce || user?.permissions?.isFacility) ?  <HeaderListItem active={activeIndex === 1} type={"training"} view={view} changeType={ ()=> handleChangeType(1)}/> : ''}
                    <HeaderListItem active={activeIndex === 4} view={view} type={"seats"} changeType={ ()=> handleChangeType(4)}/>
                    
                    
                    {/* <div className="headerListItem">
                        <FontAwesomeIcon icon={ faPeopleGroup } />
                        <span> Meeting Room</span>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Header
