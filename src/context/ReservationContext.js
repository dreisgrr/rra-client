import { createContext, useReducer } from 'react'

const INITIAL_STATE = {
    reservation: null,
    loading: false,
    error: null,
}

export const ReservationContext = createContext(INITIAL_STATE);

const ReservationReducer = (state, action) => {
    switch (action.type) {
        case "SUBMIT_START":
            return {
                reservation: null,
                loading: true,
                error: null,
            };
        case "SUBMIT_SUCCESS":
            return {
                reservation: action.payload,
                loading: false,
                error: null,
            };
        case "SUBMIT_FAILURE":
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