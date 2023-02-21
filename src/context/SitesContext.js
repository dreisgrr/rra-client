import { createContext, useReducer, useState, useEffect } from 'react'
import requestUrl from '../utils/requestMethods.js'
import { ACTION_TYPES } from '../utils/definitions.js'

// const INITIAL_STATE = {
//     sites: null
// }

// export const SitesContext = createContext(INITIAL_STATE);
export const SitesContext = createContext();

// const SitesReducer = (state, action) => {
//     switch (action.type) {
//         case ACTION_TYPES.START:
//             return {
//                 sites: null,
//                 loading: true,
//                 error: null,
//             };
//         case ACTION_TYPES.SUCCESS:
//             return {
//                 sites: action.payload,
//                 loading: false,
//                 error: null,
//             };
//         case ACTION_TYPES.FAILURE:
//             return {
//                 sites: null,
//                 loading: false,
//                 error: action.payload,
//             };
//         default:
//             return state;
//     }
// }
export const SitesContextProvider = ({ children }) => {
    // const [ state, dispatch ] = useReducer(SitesReducer, INITIAL_STATE);
    const [ sites, setSites ] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect( ()=> {
        console.log('sitesContext useEffect called')
        const fetchSites = async () => {
            console.log('sitesContext useEffect fetchSites')
            setLoading(true)
            try {
                let config = {
                    withCredentials: true
                }
                const res = await requestUrl.get(`/sites`, config)
                console.log('sitesContext useEffect fetchSites response')
                setSites(res.data)
            } catch (error) {
                setError(error)
            }
            setLoading(false)
        }
        fetchSites()
    }, [])

    return (
        <SitesContext.Provider 
            value={
                // {
                //     sites: state.sites,
                //     loading: state.loading,
                //     error: state.error,
                //     dispatch,
                // }
                sites
            }
        >
            {children}
        </SitesContext.Provider>
    )
}