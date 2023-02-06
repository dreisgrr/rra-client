import './roomFilterBar.css'
import { useState } from 'react'

const RoomFilterBar = ({passFilter}) => {
    const [filterSite, setFilterSite] = useState('63b56fea41184440f9f90696')
    const [filterType, setFilterType] = useState('conference')
    const [filterFloor, setFilterFloor] = useState('24')

    const handleFilter = () => {
        passFilter({state: {filterSite, filterType}})
    }
    return (
        <div className="roomFilterBarContainer">
            <div className="roomFilterBarWrapper">
                <div className="roomFilterBarItem">
                    <label>Site</label>
                    <select className="roomFilterBarItemSelect" id="filterSite" onChange={(e) => setFilterSite(e.target.value) }>
                        <option defaultValue="true" className="roomFilterBarItemOptions" value="63b56fea41184440f9f90696">AGT</option>
                        <option className="roomFilterBarItemOptions" value="63b56f2241184440f9f90694">GLAS</option>
                        <option className="roomFilterBarItemOptions" value="63b570b7b9b00d78455bf72d">OFT</option>
                        <option className="roomFilterBarItemOptions" value="63b570f8b9b00d78455bf72f">SMS</option>
                    </select>
                </div>
                <div className="roomFilterBarItem">
                    <label>Type</label>
                    <select className="roomFilterBarItemSelect" id="filterType" onChange={(e) => setFilterType(e.target.value) }>
                        <option defaultValue="true" className="roomFilterBarItemOptions" value="conference">Conference Room</option>
                        <option className="roomFilterBarItemOptions" value="training">Training Room</option>
                        <option className="roomFilterBarItemOptions" value="gym">Gym</option>
                        <option className="roomFilterBarItemOptions" value="sleeping">Sleeping Quarter</option>
                    </select>
                </div>
                {/* <div className="roomFilterBarItem">
                    <label>Floor</label>
                    <select className="roomFilterBarItemSelect" id="filterFloor" onChange={(e) => setFilterFloor(e.target.value) }>
                        <option defaultValue="true" className="roomFilterBarItemOptions" value="24">24</option>
                        <option className="roomFilterBarItemOptions" value="25">25</option>
                        <option className="roomFilterBarItemOptions" value="26">26</option>
                        <option className="roomFilterBarItemOptions" value="27">27</option>
                    </select>
                </div> */}
                <div className="roomFilterBarItem">
                    <button className="roomFilterBarItemBtn" onClick={handleFilter}>Filter</button>
                </div>
            </div>
        </div>
    )
}

export default RoomFilterBar
