import { createContext, useReducer, useEffect } from 'react'
import { ACTION_TYPES } from '../utils/definitions.js'

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    loading: false,
    error: null,
}

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
    switch (action.type) {
        case ACTION_TYPES.START:
            return {
                user: null,
                loading: true,
                error: null,
            };
        case ACTION_TYPES.SUCCESS:
            return {
                user: action.payload,
                loading: false,
                error: null,
            };
        case ACTION_TYPES.FAILURE:
            return {
                user: null,
                loading: false,
                error: action.payload,
            };
        case ACTION_TYPES.LOGOUT:
            return {
                user: null,
                loading: false,
                error: null,
            };
        default:
            return state;
    }
}

export const AuthContextProvider = ({ children }) => {
    const [ state, dispatch ] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect( () => {
        localStorage.setItem('user', JSON.stringify(state.user))
    },[state.user])

    return (
        <AuthContext.Provider 
            value={
                {
                    user: state.user,
                    loading: state.loading,
                    error: state.error,
                    dispatch,
                }
            }
        >
            {children}
        </AuthContext.Provider>
    )
}