import './roomListResult.css'
import { useState } from 'react'
import useFetch from '../../../hooks/useFetch'
import RoomListItem from '../roomListItem/RoomListItem'
import UpdateRoomModal from '../updateRoomModal/UpdateRoomModal'

const RoomListResult = ({urlCall}) => {
    const { data, loading, error } = useFetch(urlCall);
    console.log(data)
    const [openRoomUpdateModal, setOpenRoomUpdateModal] = useState(false)
    const [selectedRoom, setSelectedRoom] = useState({});
    const handleUpdate = (item) => {
        setOpenRoomUpdateModal(true)
        setSelectedRoom(item);
    }
    return (
        <div className="rlrContainer">
            <div className="rlrWrapper">
                <div className="rlrList">
                    { 
                        loading ? 
                            "Loading" : 
                                error ?
                                    <>
                                        <span>{error.message}</span><br/>
                                        <span>Contact System Administrator</span>
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
