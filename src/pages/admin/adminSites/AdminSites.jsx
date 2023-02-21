import './adminsites.css'
import useFetch from '../../../hooks/useFetch'
import AdminSitesItem from '../../../components/admin/adminSitesItem/AdminSitesItem'
import { useState } from 'react'
import UpdateSiteModal from '../../../components/admin/updateSiteModal/UpdateSiteModal'
import { DEFAULT_NAMES, ERROR_MESSAGE } from '../../../utils/definitions.js'

const AdminSites = () => {
    const [openSiteUpdateModal, setOpenSiteUpdateModal] = useState(false)
    const [selectedSiteToUpdate, setSelectedSiteToUpdate] = useState({});
    const handleUpdate = (item) => {
        setOpenSiteUpdateModal(true)
        setSelectedSiteToUpdate(item);
    }

    const { data, loading, error } = useFetch(`/sites`)
    return (
        <div className="adminSitesContainer">
            <div className="adminSitesWrapper">
                <h4 className="adminSitesTitle">{DEFAULT_NAMES.CARELON_SITES}</h4>
                <div className="adminSitesList">
                    {
                        loading ? 
                            <span>{ DEFAULT_NAMES.LOADING_MESSAGE }</span> :
                                error ?
                                    <>
                                        <span>{error.message}</span><br/>
                                        <span>{ERROR_MESSAGE.CONTACT}</span>
                                    </> :
                                        (Object.keys(data).length === 0) ?
                                            DEFAULT_NAMES.NO_SITES :
                                                <>
                                                    {data.map( (item) => (
                                                        <AdminSitesItem key={item._id} item={item} handleUpdate={handleUpdate}/>
                                                    ))}
                                                </> 
                    }
                </div>
            </div>
            { openSiteUpdateModal && 
                <UpdateSiteModal selectedSite={selectedSiteToUpdate} openSiteUpdateModal={setOpenSiteUpdateModal}/>
            }
        </div>
    )
}

export default AdminSites
