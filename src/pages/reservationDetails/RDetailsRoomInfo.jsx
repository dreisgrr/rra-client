import React from 'react'
import useFetch from '../../hooks/useFetch'
import { format } from "date-fns";

const RDetailsRoomInfo = ({reservationInfo}) => {
    const {data, loading, error} = useFetch(`/rooms/${reservationInfo.roomId}`)
    let created = new Date(reservationInfo.createdAt)
    return (
        <>
          <div className="rDetailsItem">
             <label>Request submitted on</label>
             <span>{`${format(created, "MMM dd yyyy")}`}</span>
             </div>
            <div className="rDetailsItem">
                <label>Site Location</label>
                <span>{data.siteId === '63b56fea41184440f9f90696' ? 'AGT' : data.siteId === '63b56f2241184440f9f90694' ? 'GLAS' : data.siteId === '63b570b7b9b00d78455bf72d' ? 'OFT' : 'SMS'}</span>
            </div>
            <div className="rDetailsItem">
                <label>Name of room</label>
                <span>{data.name}</span>
            </div>
            <div className="rDetailsItem">
                <label>Floor</label>
                <span>{data.floor}</span>
            </div>
            <div className="rDetailsItem">
                <label>Capacity</label>
                <span>{data.capacity}</span>
            </div>  
        </>
    )
}

export default RDetailsRoomInfo
