import './adminsites.css'
import useFetch from '../../../hooks/useFetch'
import AdminSitesItem from '../../../components/admin/adminSitesItem/AdminSitesItem'
import { useState } from 'react'
import UpdateSiteModal from '../../../components/admin/updateSiteModal/UpdateSiteModal'

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
                <h4 className="adminSitesTitle">Carelon Global Solution Sites</h4>
                <div className="adminSitesList">
                    {
                        loading ? 
                            "Loading..." :
                                error ?
                                    <>
                                        <span>{error.message}</span><br/>
                                        <span>Contact System Administrator</span>
                                    </> :
                                        (Object.keys(data).length === 0) ?
                                            "No Sites" :
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
