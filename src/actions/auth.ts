import axios from 'axios'
import { setAlert } from './alert'
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    LOGOUT_FAIL,
    CLEAR_PROFILE,
} from './include/types'
import { AppDispatch } from '../store'

// Load user
export const loadUserAction = () => async (dispatch: AppDispatch) => {
    try {
        const res = await axios.get('/api/accounts/info', {
            withCredentials: true,
        })
        dispatch({
            type: USER_LOADED,
            payload: res.data,
        })
    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
        })
    }
}

// Register User
export const registerAction =
    (name: string, email: string, password: string) => async (dispatch: AppDispatch) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const body = JSON.stringify({ name, email, password })

        try {
            const res = await axios.post('/api/accounts/register', body, config)

            dispatch({ type: REGISTER_SUCCESS, payload: res.data })

            dispatch(loadUserAction())
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                const errors = err.response.data.error

                if (errors) {
                    errors.forEach((error: any) =>
                        dispatch(setAlert(error.msg, 'danger'))
                    )
                }

                dispatch({ type: REGISTER_FAIL })
            }
        }
    }

// Login User
export const loginAction =
    (email: string, password: string) => async (dispatch: AppDispatch) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const body = JSON.stringify({ email, password })

        try {
            await axios.post('/api/accounts/login', body, config)

            dispatch({ type: LOGIN_SUCCESS })

            dispatch(loadUserAction())
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                const errors = err.response.data.error

                if (errors) {
                    errors.forEach((error: any) =>
                        dispatch(setAlert(error.msg, 'danger'))
                    )
                }

                dispatch({ type: LOGIN_FAIL })
            }
        }
    }

// Logout / Clear Profile
export const logoutAction = () => async (dispatch: AppDispatch) => {
    try {
        const res = await axios.post('/api/accounts/logout', {
            withCredentials: true,
        })
        if (res.status != 200) throw `Logout failure - ${res.status}`

        dispatch({ type: CLEAR_PROFILE })
        dispatch({ type: LOGOUT })
    } catch (err) {
        dispatch(setAlert('Logout failure', 'danger'))
        dispatch({ type: LOGOUT_FAIL })
    }
}
