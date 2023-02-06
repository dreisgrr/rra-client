import "./login.css"
import { useContext, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import axios from "axios"
import { useNavigate } from "react-router-dom"

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
        dispatch({type:"LOGIN_START"});
        try {
            const res = await axios.post("/auth/login", credentials)
            console.log(res.data)
            dispatch({type:"LOGIN_SUCCESS", payload: res.data})
            navigate('/');
        } catch (error) {
            console.log(error)
            dispatch({type:"LOGIN_FAILURE", payload: error.response.data})
        }
    }

    return (
        <div className="login">
            <div className="loginTitles">
                <span className="appName">Room Reservation App</span>
                <span className="companyName">Carelon Global Solutions</span>
            </div>
            <div className="loginContainer">
                <input 
                    type="text" 
                    placeholder="Domain ID" 
                    id="domainId" 
                    className="loginInput" 
                    style={{textTransform: 'uppercase'}}
                    onChange={handleChange}
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
    )
}

export default Login
