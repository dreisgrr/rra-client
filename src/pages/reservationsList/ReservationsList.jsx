import "./reservationslist.css"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import useFetch from "../../hooks/useFetch"
import ReservationsListItem from "../../components/reservationsListItem/ReservationsListItem"

const ReservationsList = () => {
    const { user } = useContext(AuthContext)
    const { data, loading, error } = useFetch(`/reservations?domainId=${user.domainId}`)
    return (
        <div className="rlContainer">
            <div className="rlWrapper">
                <h4 className="rlTitle">Reservations</h4>
                <div className="rlList">
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

export default ReservationsList
