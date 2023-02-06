import './adminviewrequests.css'
import useFetch from '../../../hooks/useFetch'
import ReservationsListItem from '../../../components/reservationsListItem/ReservationsListItem'

const AdminViewRequests = () => {
    const { data, loading, error } = useFetch(`/reservations?isAdmin=true&reservationStatus=ALL`)
    return (
        <div className="vrContainer">
            <div className="vrWrapper">
                
                <div className="vrList">
                    {
                        loading ? 
                            "Loading..." :
                                error ?
                                    <>
                                        <span>{error.message}</span><br/>
                                        <span>Contact System Administrator</span>
                                    </> :
                                        (Object.keys(data).length === 0) ?
                                            "No Reservations" :
                                                <>
                                                    {data.map( (item) => (
                                                        <ReservationsListItem key={item._id} item={item}/>
                                                    ))}
                                                </> 
                    }
                </div>
            </div>
        </div>
    )
}

export default AdminViewRequests
