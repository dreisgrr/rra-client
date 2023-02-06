import React, { useContext } from 'react'
import './actionmodal.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../../context/AuthContext'
import { useState, useEffect } from 'react'

const ActionModal = ({action, openActionModal, handleActionReservation, error, passRemarks}) => {
    const { user } = useContext(AuthContext)
    const [remarks, setRemarks] = useState('')
    const [isFormValidated, setIsFormValidated] = useState(false);

    useEffect( () => {
        const onPageLoad = () => {
            if( (!user?.permissions.isAdmin && action === 'cancel') || (action === 'approve' && user?.permissions.isAdmin)) setIsFormValidated(true)
        };
        if (document.readyState === 'complete') {
            onPageLoad();
        } else {
            window.addEventListener('load', onPageLoad);
            return () => window.removeEventListener('load', onPageLoad);
        }
    }, [])

    const handleChange = (e) => {
        setRemarks(e.target.value)
        passRemarks(remarks)
        if(remarks.trim() !== '' && user?.permissions.isAdmin) setIsFormValidated(true)
        else setIsFormValidated(false) 
    }

    return (
        <div className="actionModal">
            <div className="actionModalContainer">
                <FontAwesomeIcon 
                    icon={faCircleXmark}
                    className="actionCloseModal"
                    onClick={ ()=> openActionModal(false)}
                />
                <div className="actionModalTitle">
                    <h3>{action} Reservation</h3>
                </div>
                <div className="actionModalForm">
                    <div className="actionModalFormItem">
                        <span>Are you sure you want to {action}?</span>
                    </div>
                    {
                        ((action === 'cancel' || action === 'reject') && user?.permissions.isAdmin) ? 
                            <>
                                <div className="actionModalFormItem">
                                    <input type="text" name="remarks" className="actionModalInput" placeholder="Remarks"  onKeyUp={handleChange} onChange={handleChange}/>
                                </div> 
                            </>
                            :
                            <></>
                    }
                    {/* <div className="actionModalFormItem">
                        <input type="text" className="actionModalInput" placeholder="Type your Domain ID to confirm"/>
                    </div> */}
                    <div className="actionModalFormItem">
                        <button disabled={!isFormValidated} className="actionModalBtn" onClick={handleActionReservation}>{action} Reservation</button>
                        {error && <span>{error.message}</span>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ActionModal
