import { createContext, useReducer } from 'react'
import { ACTION_TYPES } from '../utils/definitions.js'

const INITIAL_STATE = {
    reservation: null,
    loading: false,
    error: null,
}

export const ReservationContext = createContext(INITIAL_STATE);

const ReservationReducer = (state, action) => {
    switch (action.type) {
        case ACTION_TYPES.START:
            return {
                reservation: null,
                loading: true,
                error: null,
            };
        case ACTION_TYPES.SUCCESS:
            return {
                reservation: action.payload,
                loading: false,
                error: null,
            };
        case ACTION_TYPES.FAILURE:
            return {
                reservation: null,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export const ReservationContextProvider = ({ children }) => {
    const [ state, dispatch ] = useReducer(ReservationReducer, INITIAL_STATE);

    return (
        <ReservationContext.Provider 
            value={
                {
                    reservation: state.reservation,
                    loading: state.loading,
                    error: state.error,
                    dispatch,
                }
            }
        >
            {children}
        </ReservationContext.Provider>
    )
}