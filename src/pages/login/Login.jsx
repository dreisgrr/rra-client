import "./login.css"
import { useContext, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"
import requestUrl from '../../utils/requestMethods.js'
import carelonLogoSvg from "../../resources/carelon/carelon-logo-colored.svg"
import { ACTION_TYPES, DEFAULT_NAMES } from "../../utils/definitions.js"

const Login = () => {
    const [ credentials, setCredentials ] = useState({
        domainId: undefined,
        password: undefined,
    })

    const { loading, error, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials(prev => ({...prev, [e.target.id]: e.target.value }))
    }

    const handleLogin = async e => {
        e.preventDefault();
        dispatch({type:ACTION_TYPES.START});
        try {
            let config = {
                withCredentials: true
            }
            const res = await requestUrl.post("/auth/login", credentials, config)
            const userId = res.data._id
            dispatch({ type:ACTION_TYPES.SUCCESS, payload: res.data })
            navigate('/');
            //TODO: LOG INSTANCE
        } catch (error) {
            if (error.response?.data !== undefined) 
                dispatch({type:ACTION_TYPES.FAILURE, payload: error.response?.data})
                //TODO: LOG INSTANCE
            else 
                dispatch({type:ACTION_TYPES.FAILURE, payload: error})
                //TODO: LOG INSTANCE
        }
    }

    return (
        <div className="login">
            <div className="upperSection">
                <div className="loginTitles">
                    <img src={carelonLogoSvg} alt="" className="loginCompanyLogo"/>
                    <span className="appName">{DEFAULT_NAMES.APP_NAME}</span>
                </div>
            </div>
            <div className="lowerSection">
                
                <div className="loginContainer">
                    <input 
                        type="text" 
                        placeholder="Domain ID" 
                        id="domainId" 
                        className="loginInput domainId" 
                        onChange={handleChange}
                        maxLength="7"
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        id="password" 
                        className="loginInput" 
                        onChange={handleChange}
                    />
                    <button disabled={loading} className="loginButton" onClick={handleLogin}>Login</button>
                    { error && <span className="loginError">{error.message}</span>}
                </div>
            </div>
        </div>
    )
}

export default Login
