import './updateRoomModal.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import _ from 'lodash'
import axios from 'axios';
import { useContext } from 'react';
import { ReservationContext } from '../../../context/ReservationContext';
import { useEffect } from 'react';

const UpdateRoomModal = ({openRoomUpdateModal, selectedRoom}) => {
    const navigate = useNavigate();
    const { loading, error, dispatch } = useContext(ReservationContext);
    const [room, setRoom] = useState({
        name: selectedRoom.name,
        facilityType: selectedRoom.facilityType,
        description: selectedRoom.description,
        capacity: selectedRoom.capacity,
        floor: selectedRoom.floor,
        isRestricted: selectedRoom.isRestricted,
        features: {
            withCisco: selectedRoom.features.withCisco
        }
    })
    const [initRoom, setInitRoom] = useState({
        name: selectedRoom.name,
        facilityType: selectedRoom.facilityType,
        description: selectedRoom.description,
        capacity: selectedRoom.capacity,
        floor: selectedRoom.floor,
        isRestricted: selectedRoom.isRestricted,
        features: {
            withCisco: selectedRoom.features.withCisco
        }
    })
    const [isFormValidated, setIsFormValidated] = useState(false);

    const handleChange = (e) => {
        console.log(e.target.value)
        setRoom(prev => ({...prev, [e.target.id]: e.target.value }))
        validateForm();
    }
    const updateFeatures = (e) => {
        setRoom(prev => {
            const newRoom = {...prev}
            if(e.target.id === 'withCisco') {
                newRoom.features[e.target.id] = e.target.value
            }
            return newRoom
        })
        validateForm()
    }
    const validateForm = () => {
        console.log('room', room)
        if(room?.name?.trim() !== '' && 
        room?.description?.trim() !== '' && 
        room?.capacity !== '' && 
        room?.floor !== '' 
        && !_.isEqual(room, initRoom)
        
        ) setIsFormValidated(true)
        else setIsFormValidated(false) 
    }
    useEffect( ()=> {
        validateForm()
    },
    [room.facilityType, room.isRestricted, room.features.withCisco])

    const processUpdate = async e => {
        e.preventDefault();
        dispatch({type: 'SUBMIT_START'})
        try {
            let config = {
                headers: {
                  'Content-Type': 'application/json',
                }
              }
            const res = await axios.put(`/rooms/${selectedRoom._id}`, room, config)
            console.log(res.data)
            dispatch({type:"SUBMIT_SUCCESS", payload: res.data})
            openRoomUpdateModal(false)
            navigate('/rooms')
        } catch (error) {
            dispatch({type:"SUBMIT_FAILURE", payload: error.response.data})
        }
        window.location.reload()
    }

    return (
        <div className="updateRoomModal">
            <div className="updateRoomModalContainer">
                <FontAwesomeIcon 
                    icon={faCircleXmark}
                    className="closeModal"
                    onClick={ ()=> openRoomUpdateModal(false)}
                />
                <div className="updateRoomModalTitle">
                    <h3>Update Room Details</h3>
                    { error && <span className="updateRoomError">{error.message}</span>}
                </div>
                <div className="updateRoomModalForm">
                    <div className="updateRoomModalFormColumn">
                        <div className="updateRoomModalFormItem">
                            <label>Name</label>
                            <input type="text" name="roomName" id="name" className="updateRoomInput" placeholder={selectedRoom.name} onKeyUp={handleChange} onChange={handleChange} value={room.name}/>
                        </div>
                        <div className="updateRoomModalFormItem">
                            <label>Facility Type</label>
                            <select className="updateRoomModalFormItemSelect" id="facilityType" onChange={handleChange}>
                                <option className="roomFilterBarItemOptions" selected={ selectedRoom.facilityType === 'conference'} value="conference">Conference Room</option>
                                <option className="roomFilterBarItemOptions" selected={ selectedRoom.facilityType === 'training'} value="training">Training Room</option>
                                <option className="roomFilterBarItemOptions" selected={ selectedRoom.facilityType === 'gym'} value="gym">Gym</option>
                                <option className="roomFilterBarItemOptions" selected={ selectedRoom.facilityType === 'sleeping'} value="sleeping">Sleeping Quarter</option>
                            </select>
                        </div>
                        <div className="updateRoomModalFormItem">
                            <label>Description</label>
                            <input type="text" name="roomDesc" id="description" className="updateRoomInput" placeholder={selectedRoom.description} onKeyUp={handleChange} onChange={handleChange} value={room.description}/>
                        </div>
                        <div className="updateRoomModalFormItem">
                            <label>Capacity</label>
                            <input type="number" min="1" max="35" name="roomCapacity" id="capacity" className="updateRoomInput" placeholder={selectedRoom.capacity} onKeyUp={handleChange} onChange={handleChange} value={room.capacity}/>
                        </div>
                        <div className="updateRoomModalFormItem">
                            <label>Floor</label>
                            <input type="number" min="1" max="50" name="roomFloor" id="floor" className="updateRoomInput" placeholder={selectedRoom.floor} onKeyUp={handleChange} onChange={handleChange} value={room.floor}/>
                        </div>
                        <div className="updateRoomModalFormItem">
                            <label>Restricted</label>
                            <select className="updateRoomModalFormItemSelect" id="isRestricted" onChange={handleChange }>
                                <option className="roomFilterBarItemOptions" selected={ selectedRoom.isRestricted === false} value="false">No</option>
                                <option className="roomFilterBarItemOptions" selected={ selectedRoom.isRestricted === true} value="true">Yes</option>
                            </select>
                        </div>
                        <div className="updateRoomModalFormItem">
                            <label>Cisco Equipped</label>
                            <select className="updateRoomModalFormItemSelect" id="withCisco" onChange={updateFeatures }>
                                <option className="roomFilterBarItemOptions" selected={ selectedRoom.features.withCisco === false} value="false">No</option>
                                <option className="roomFilterBarItemOptions" selected={ selectedRoom.features.withCisco === true} value="true">Yes</option>
                            </select>
                        </div>
                        <button disabled={!isFormValidated} className="updateRoomModalBtn" onClick={processUpdate}>Update</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateRoomModal
