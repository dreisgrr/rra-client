import './admintopbar.css'
import AdminTopbarItem from '../topbarItems/AdminTopbarItem'
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGripLinesVertical } from "@fortawesome/free-solid-svg-icons"

const AdminTopbar = ({passActive, activeIndexApp}) => {
    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/")
    const url = splitLocation[1];
    const urlDefinition = ['reservations', 'search', 'sites', 'rooms']
    let index = urlDefinition.findIndex( item => item === url)
    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState(activeIndexApp)

    const navDefinition = [
        {type: 'reservations', title: 'Reservation Requests', index: 0},
        {type: 'search', title: 'Reserve Rooms', index: 1},
        {type: 'sites', title: 'Site Management', index: 2},
        {type: 'rooms', title: 'Room Management', index: 3},
    ]

    const handleChangeType = (index, url) => {
        setActiveIndex(index)
        passActive(index);
        navigate(`/${url}`);
    }

    return (
        <div className="adminTopbar">
            <div className="topbarContainer">
                <h4>Admin Dashboard</h4>
                <div className="topbarList">
                    {
                        navDefinition.map( (item) => 
                            (
                                <AdminTopbarItem title={item.title} type={item.type} active={activeIndex === item.index} changeType={ ()=> handleChangeType(item.index, item.type)}/>
                            )
                        )
                    }
                    
                    {/* <AdminTopbarItem title="Search Rooms" type="search" active={activeIndex === 2} changeType={ ()=> handleChangeType(2)}/>
                    <AdminTopbarItem title="Site Management" type="sites" active={activeIndex === 3} changeType={ ()=> handleChangeType(3)}/>
                    <AdminTopbarItem title="Room Management" type="rooms" active={activeIndex === 4} changeType={ ()=> handleChangeType(4)}/> */}
                </div>
            </div>
        </div>
    )
}

export default AdminTopbar
