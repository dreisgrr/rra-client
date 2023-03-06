import "./navbar.css"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"
import carelonLogoSvg from "../../resources/carelon/carelon-logo-vertical.png"

const Navbar = ({passActive}) => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const handleClick = (path) => {
        console.log(path === 'home' && !user?.permissions.isAdmin)
        if (path === 'logout') {
            window.localStorage.clear();
            window.location.reload();
        }
        if (!user?.permissions.isAdmin) {
            if (path === 'home') {
                navigate('/')
            } 
            else if (path === 'reservations') navigate('/reservations')
        }
        else {
            passActive(0);
            navigate('/reservations')
            window.location.reload();
        }
        
        
        
    }

    return (
        <div className="navbar" style={ user ? {display: "flex"} : {display: "none"}}>
            <div className="navContainer">
                <div className="logoWrapper" onClick={()=> handleClick('home')} >
                    <img src={carelonLogoSvg} alt="" className="navCompanyLogo"/>
                    <span className="logo">Space Reservation App</span>
                    {/* <span className="logoSmall">Carelon Global Solutions</span> */}
                </div>
                
                <div className="navItems">
                    { user ? user.domainId : ''}
                    { user?.permissions.isAdmin ? '' : <span className="navOptions" onClick={() => handleClick('reservations')}>Reservation History</span>}
                    <span className="navOptions" onClick={() => handleClick('logout')}>Logout</span>
                </div>
            </div>
        </div>
    )
}

export default Navbar
