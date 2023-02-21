import './roomList.css'
import RoomFilterBar from '../../../components/admin/roomFilterBar/RoomFilterBar'
import RoomListResult from '../../../components/admin/RoomListResult/RoomListResult'
import { useState } from 'react'

const RoomList = () => {
    const [searchQuery, setSearchQuery] = useState({})
    const [urlCall, setUrlCall] = useState('/rooms')

    const handlePassFilter = (filter) => {
        // console.log('filter', filter)
        setSearchQuery(filter)
        setUrlCall(`rooms?siteId=${filter?.state?.filterSite}&facilityType=${filter?.state?.filterType}`)
    }

    return (
        <div className="roomListContainer">
            <div className="roomListFilterBarWrapper">
                <RoomFilterBar passFilter={(filter)=> handlePassFilter(filter)}/>
            </div>
            <div className="roomListResultWrapper">
                <RoomListResult urlCall={urlCall}/>
            </div>
        </div>
    )
}

export default RoomList
