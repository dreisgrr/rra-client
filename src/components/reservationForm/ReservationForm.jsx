import './reservationForm.css'
import { ReservationContext } from '../../context/ReservationContext';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { format } from "date-fns";
import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom"
import requestUrl from '../../utils/requestMethods.js'

const ReservationForm = ({openReservationModal, selectedRoom, requestDetails, hoursDef}) => {
    
    const navigate = useNavigate();
    const { loading, error, dispatch } = useContext(ReservationContext);
    const { user } = useContext(AuthContext);
    let reservationStatus = 'SUBMITTED'
    if (user?.permissions.isAdmin) {
        reservationStatus = "APPROVED"
    } 
    const dfStartTime = new Date(requestDetails.requestStartTime)
    const dfEndTime = new Date(requestDetails.requestEndTime)
    const [ reservation, setReservation ] = useState(
        {
            roomId: selectedRoom._id,
            requestor: user.domainId,
            domainId: user.domainId,
            siteId: selectedRoom.siteId,
            reservationStatus: reservationStatus,
            reservationStartTime: new Date(requestDetails.requestStartTime),
            reservationEndTime: new Date(requestDetails.requestEndTime),
            facilityType: requestDetails.search,
            duration: requestDetails.duration,
            pax: requestDetails.options.pax,
            purpose: '',
            occupants: [],
            position: user.domainId,
            shiftSchedule: "First",
            lineOfBusinessOrTower: "Delivery Excellence"
        }
    );

    const [isFormValidated, setIsFormValidated] = useState(false);

    const handleChange = (e) => {
        setReservation(prev => ({...prev, [e.target.id]: e.target.value }))
        if(reservation.purpose.trim() !== '' && reservation.occupants.trim() !== '') setIsFormValidated(true)
        else setIsFormValidated(false) 
    }

    const processReserve = async e => {
        e.preventDefault();
        console.log(reservation)
        dispatch({type: 'SUBMIT_START'})
        try {
            let config = {
                headers: {
                  'Content-Type': 'application/json',
                },
                withCredentials: 'same-origin'
            }
            const res = await requestUrl.post(`/reservations?id=${user._id}`, reservation, config)
            console.log(res.data)
            dispatch({type:"SUBMIT_SUCCESS", payload: res.data})
            openReservationModal(false)
            navigate('/reservations')
        } catch (error) {
            dispatch({type:"SUBMIT_FAILURE", payload: error.response.data})
        }
    }

    return (
        <div className="reservationModal">
            <div className="modalContainer">
                <FontAwesomeIcon 
                    icon={faCircleXmark}
                    className="closeModal"
                    onClick={ ()=> openReservationModal(false)}
                />
                <div className="modalTitle">
                    <h3>Reservation Form</h3>
                </div>
                <div className="modalForm">
                    <div className="modalFormColumn">
                        <div className="modalFormItem">
                            <label>Site Location</label>
                            <span>{selectedRoom.siteId === '63b56fea41184440f9f90696' ? 'AGT' : selectedRoom.siteId === '63b56f2241184440f9f90694' ? 'GLAS' : selectedRoom.siteId === '63b570b7b9b00d78455bf72d' ? 'OFT' : 'SMS'}</span>
                        </div>
                        <div className="modalFormItem">
                            <label>Name of room</label>
                            <span>{selectedRoom.name}</span>
                        </div>
                        <div className="modalFormItem">
                            <label>Floor</label>
                            <span>{selectedRoom.floor}</span>
                        </div>                
                        <div className="modalFormItem">
                            <label>Capacity</label>
                            <span>{selectedRoom.capacity}</span>
                        </div>
                        <div className="modalFormItem">
                            <label>Requestor</label>
                            <span>Adrian Esguerra</span>
                        </div>
                        <div className="modalFormItem">
                            <label>Position</label>
                            <span>Engineer Sr</span>
                        </div>
                        <div className="modalFormItem">
                            <label>Date of Request</label>
                            <span>{`${format(requestDetails.requestStartTime, "MM/dd/yyyy")}`}</span>
                        </div>
                        <div className="modalFormItem">
                            <label>Start Time</label>
                            <span>{hoursDef[dfStartTime.getHours()]}</span>
                        </div>
                        <div className="modalFormItem">
                            <label>End Time</label>
                            <span>{hoursDef[dfEndTime.getHours()]}</span>
                        </div>
                        <div className="modalFormItem">
                            <label>Duration</label>
                            <span>{requestDetails.duration} hr/s</span>
                        </div>
                        <div className="modalFormItem">
                            <label>Pax</label>
                            <span>{requestDetails.options.pax}</span>
                        </div>
                    </div>
                    <div className="modalFormColumn">
                        <div className="modalFormItem">
                            <label>Purpose</label>
                            <input type="text" className="reservationInput" placeholder="Work" id="purpose" onChange={handleChange}/>
                        </div>
                        <div className="modalFormItem">
                            <label>Shift Schedule</label>
                            <select className="reservationSelect" id="shiftSchedule" defaultValue="First" onChange={handleChange}>
                                <option value="First">First Shift</option>
                                <option value="Mid">Mid Shift</option>
                                <option value="Night">Night Shift</option>
                            </select>
                        </div>
                        <div className="modalFormItem">
                            <label>Tower/LOB</label>
                            <select className="reservationSelect" id="lineOfBusinessOrTower" defaultValue="Delivery Excellence" onKeyUp={handleChange} onChange={handleChange}>
                                <option value="Delivery Excellence">Delivery Excellence</option>
                                <option value="Clinical">Clinical</option>
                                <option value="Tower Tower">Tower Tower</option>
                            </select>
                        </div>
                        <div className="modalFormItem">
                            <label>Names of occupants</label>
                        </div>
                        <div className="modalFormItem" id="occupantNames">
                            <textarea name="" className="reservationTextArea" id="occupants" cols="30" rows="20" onKeyUp={handleChange} onChange={handleChange}></textarea>
                        </div>
                        <div className="modalFormItem">
                            <button disabled={!isFormValidated} className="reservationModalBtn" onClick={processReserve}>Submit Reservation</button>
                        </div>
                        { error && <span className="reservationError">{error.message}</span>}
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default ReservationForm
