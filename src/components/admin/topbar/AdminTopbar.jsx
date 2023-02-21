import './admintopbar.css'
import AdminTopbarItem from '../topbarItems/AdminTopbarItem'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { navDefinition } from "../../../utils/definitions.js"

const AdminTopbar = ({passActive, activeIndexApp}) => {
    // const location = useLocation();
    // const { pathname } = location;
    // const splitLocation = pathname.split("/")
    // const url = splitLocation[1];
    // const urlDefinition = ['reservations', 'search', 'sites', 'rooms']
    // let index = urlDefinition.findIndex( item => item === url)
    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState(activeIndexApp)
    // console.log('adminTopbar', activeIndex)
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
                                <AdminTopbarItem key={item.index} title={item.title} type={item.type} active={activeIndex === item.index} changeType={ ()=> handleChangeType(item.index, item.type)}/>
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
