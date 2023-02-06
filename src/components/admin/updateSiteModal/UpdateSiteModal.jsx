import './updateSiteModal.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash'
import axios from 'axios';
import { useContext } from 'react';
import { ReservationContext } from '../../../context/ReservationContext';

const UpdateSiteModal = ({openSiteUpdateModal, selectedSite}) => {
    const navigate = useNavigate();
    const { loading, error, dispatch } = useContext(ReservationContext);
    const [site, setSite] = useState({
        title: selectedSite.title,
        location: selectedSite.location,
        address: selectedSite.address,
        contactNumber: selectedSite.contactNumber
    })
    const [initSite, setInitSite] = useState({
        title: selectedSite.title,
        location: selectedSite.location,
        address: selectedSite.address,
        contactNumber: selectedSite.contactNumber
    })
    const [isFormValidated, setIsFormValidated] = useState(false);

    const handleChange = (e) => {
        setSite(prev => ({...prev, [e.target.id]: e.target.value }))
        
        if(site?.title?.trim() !== '' && 
        site?.location?.trim() !== '' && 
        site?.address?.trim() !== '' && 
        site?.contactNumber?.trim() !== '' 
        && !_.isEqual(site, initSite)
        
        ) setIsFormValidated(true)
        else setIsFormValidated(false) 
    }

    const processUpdate = async e => {
        e.preventDefault();
        console.log(site)
        dispatch({type: 'SUBMIT_START'})
        try {
            let config = {
                headers: {
                  'Content-Type': 'application/json',
                },
                withCredentials: 'same-origin'
            }
            const res = await axios.put(`/sites/${selectedSite._id}`, site, config)
            console.log(res.data)
            dispatch({type:"SUBMIT_SUCCESS", payload: res.data})
            openSiteUpdateModal(false)
            navigate('/sites')
        } catch (error) {
            dispatch({type:"SUBMIT_FAILURE", payload: error.response.data})
        }
        window.location.reload()
    }

    return (
        <div className="updateSiteModal">
            <div className="updateSiteModalContainer">
                <FontAwesomeIcon 
                    icon={faCircleXmark}
                    className="closeModal"
                    onClick={ ()=> openSiteUpdateModal(false)}
                />
                
                <div className="updateSiteModalTitle">
                    <h3>Update Site Details</h3>
                    { error && <span className="updateSiteError">{error.message}</span>}
                </div>
                <div className="updateSiteModalForm">
                    <div className="updateSiteModalFormColumn">
                        <div className="updateModalFormItem">
                            <label>Title</label>
                            <input type="text" disabled name="siteTitle" id="title" className="updateSiteInput" placeholder={selectedSite.title} onKeyUp={handleChange} onChange={handleChange} value={site.title}/>
                        </div>
                        <div className="updateModalFormItem">
                            <label>Location</label>
                            <input type="text" name="siteLocation" id="location" className="updateSiteInput" placeholder={selectedSite.location} onKeyUp={handleChange} onChange={handleChange} value={site.location}/>
                        </div>
                        <div className="updateModalFormItem">
                            <label>Address</label>
                            <textarea name="siteAddress" id="address" cols="30" rows="5" placeholder={selectedSite.address} onKeyUp={handleChange} onChange={handleChange} value={site.address}></textarea>
                        </div>
                        <div className="updateModalFormItem">
                            <label>Contact Number</label>
                            <input type="text" name="siteContact" id="contactNumber" className="updateSiteInput" placeholder={selectedSite.contactNumber} onKeyUp={handleChange} onChange={handleChange} value={site.contactNumber}/>
                        </div>
                        <button disabled={!isFormValidated} className="updateSiteModalBtn" onClick={processUpdate}>Update</button>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateSiteModal
