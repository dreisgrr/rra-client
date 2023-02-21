import './roomListResult.css'
import { useState } from 'react'
import useFetch from '../../../hooks/useFetch'
import RoomListItem from '../roomListItem/RoomListItem'
import UpdateRoomModal from '../updateRoomModal/UpdateRoomModal'
import { DEFAULT_NAMES, ERROR_MESSAGE } from '../../../utils/definitions'

const RoomListResult = ({urlCall}) => {
    const { data, loading, error } = useFetch(urlCall);
    // console.log(data)
    const [openRoomUpdateModal, setOpenRoomUpdateModal] = useState(false)
    const [selectedRoom, setSelectedRoom] = useState({});
    const handleUpdate = (item) => {
        setOpenRoomUpdateModal(true)
        setSelectedRoom(item);
    }
    return (
        <div className="rlrContainer">
            <div className="rlrWrapper">
                <h1 className="listTitle">Spaces ({data.length})</h1>
                <div className="rlrList">
                    { 
                        loading ? 
                            <span>{DEFAULT_NAMES.LOADING_MESSAGE}</span> : 
                                error ?
                                    <>
                                        <span>{error.message}</span><br/>
                                        <span>{ERROR_MESSAGE.CONTACT}</span>
                                    </> :
                                        Object.keys(data).length === 0 ?
                                            "No matches found" :
                                                <> 
                                                    {data.map((item) => (
                                                        <RoomListItem 
                                                            key={item._id} 
                                                            item={item}
                                                            handleUpdate={handleUpdate}
                                                        />
                                                    ))}
                                                </>
                    }
                </div>
            </div>
            {
                openRoomUpdateModal && 
                <UpdateRoomModal selectedRoom={selectedRoom} openRoomUpdateModal={setOpenRoomUpdateModal}/>
            }
        </div>
    )
}

export default RoomListResult
