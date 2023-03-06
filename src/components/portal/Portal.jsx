import "./portal.css"
import carelonLogoSvg from "../../resources/carelon/carelon-logo-colored.svg"

const Portal = () => {
    return (
        <div className="portal-navbar">
            <div className="navContainer">
                <div className="logoWrapper">
                    <img src={carelonLogoSvg} alt="" className="navCompanyLogo"/>
                </div>
            </div>
        </div>
    )
}

export default Portal
