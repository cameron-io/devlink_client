import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
  GET_REPOS,
} from './include/types';
import { AppDispatch } from '../store';

// Get current user's profile
export const getCurrentProfile = () => 
    async (dispatch: AppDispatch) => {
        try {
            const res = await axios.get('/api/profiles/me');
            dispatch({
                type: GET_PROFILE,
                payload: res.data,
            });
        } catch (err) {
            if(axios.isAxiosError(err) && err.response) {
                dispatch({
                type: PROFILE_ERROR,
                payload: {
                    msg: err.response.statusText,
                    status: err.response.status,
                },
                })
            };
        }
    };

// Get all profiles
export const getProfiles = () =>
    async (dispatch: AppDispatch) => {
        dispatch({ type: CLEAR_PROFILE });
        try {
            const res = await axios.get('/api/profiles');
            dispatch({
                type: GET_PROFILES,
                payload: res.data,
            });
        } catch (err) {
            if(axios.isAxiosError(err) && err.response) {
                dispatch({
                    type: PROFILE_ERROR,
                    payload: {
                        msg: err.response.statusText,
                        status: err.response.status,
                    },
                });
            }
        }
    };

// Get profiles by id
export const getProfileById = (userId: number) =>
    async (dispatch: AppDispatch) => {
        try {
            const res = await axios.get(`/api/profiles/user/${userId}`);
            dispatch({
                type: GET_PROFILE,
                payload: res.data,
            });
        } catch (err) {
            if(axios.isAxiosError(err) && err.response) {
                dispatch({
                    type: PROFILE_ERROR,
                    payload: {
                        msg: err.response.statusText,
                        status: err.response.status,
                    },
                });
            }
        }
    };

// Get GitHub repos
export const getGithubRepos = (gitHubUsername: string) => 
    async (dispatch: AppDispatch) => {
        try {
            const res = await axios.get(`/api/profiles/github/${gitHubUsername}`);

            dispatch({
                type: GET_REPOS,
                payload: res.data,
            });
        } catch (err) {
            if(axios.isAxiosError(err) && err.response) {
                dispatch({
                    type: PROFILE_ERROR,
                    payload: {
                        msg: err.response.statusText,
                        status: err.response.status,
                    },
                });
            }
        }
    };

// Create or update profile
export const createProfile = (formData: any, navigate: any, edit = false) => 
    async (dispatch: AppDispatch) => {
        try {
            const config = {
                headers: { 'Content-Type': 'application/json' },
            };

            var { skills } = formData;

            if (skills) {
                formData.skills = skills.split(',').map((skill: string) => skill.trim());
            }

            const res = await axios.post('/api/profiles', formData, config);
            dispatch({
                type: GET_PROFILE,
                payload: res.data,
            });

            dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

            navigate('/dashboard');
        } catch (err) {
            if(axios.isAxiosError(err) && err.response) {
                const errors = err.response.data.errors;

                if (errors) {
                    errors.forEach((error: any) => dispatch(setAlert(error.msg, 'danger')));
                }

                dispatch({
                    type: PROFILE_ERROR,
                    payload: {
                        msg: err.response.statusText,
                        status: err.response.status,
                    },
                });
            }
        }
    };

// Add Experience
export const addExperience = (formData: any, navigate: any) => 
    async (dispatch: AppDispatch) => {
        try {
            const config = {
                headers: { 'Content-Type': 'application/json' },
            };

            const res = await axios.put('/api/profiles/experience', formData, config);

            dispatch({
                type: UPDATE_PROFILE,
                payload: res.data,
            });

            dispatch(setAlert('Experience Added', 'success'));

            navigate('/dashboard');
        } catch (err) {
            if(axios.isAxiosError(err) && err.response) {
                const errors = err.response.data.errors;

                if (errors) {
                    errors.forEach((error: any) => dispatch(setAlert(error.msg, 'danger')));
                }

                dispatch({
                    type: PROFILE_ERROR,
                    payload: {
                        msg: err.response.statusText,
                        status: err.response.status,
                    },
                });
            }
        }
    };

// Add Education
export const addEducation = (formData: any, navigate: any) => 
    async (dispatch: AppDispatch) => {
        try {
            const config = {
                headers: { 'Content-Type': 'application/json' },
            };

            const res = await axios.put('/api/profiles/education', formData, config);

            dispatch({
                type: UPDATE_PROFILE,
                payload: res.data,
            });

            dispatch(setAlert('Education Added', 'success'));

            navigate('/dashboard');
        } catch (err) {
            if(axios.isAxiosError(err) && err.response) {
                const errors = err.response.data.errors;

                if (errors) {
                errors.forEach((error: any) => dispatch(setAlert(error.msg, 'danger')));
                }

                dispatch({
                type: PROFILE_ERROR,
                payload: {
                    msg: err.response.statusText,
                    status: err.response.status,
                },
                });
            }
        }
    };

// Delete Experience
export const deleteExperience = (id: number) => 
    async (dispatch: AppDispatch) => {
        try {
            const res = await axios.delete(`/api/profiles/experience/${id}`);

            dispatch({ type: UPDATE_PROFILE, payload: res.data });

            dispatch(setAlert('Experience Removed', 'success'));
        } catch (err) {
            if(axios.isAxiosError(err) && err.response) {
                dispatch({
                    type: PROFILE_ERROR,
                    payload: {
                        msg: err.response.statusText,
                        status: err.response.status,
                    },
                });
            }
        }
    };

// Delete Education
export const deleteEducation = (id: number) => 
    async (dispatch: AppDispatch) => {
    try {
        const res = await axios.delete(`/api/profiles/education/${id}`);

        dispatch({ type: UPDATE_PROFILE, payload: res.data });

        dispatch(setAlert('Education Removed', 'success'));
    } catch (err) {
        if(axios.isAxiosError(err) && err.response) {
            dispatch({
                type: PROFILE_ERROR,
                payload: {
                msg: err.response.statusText,
                status: err.response.status,
                },
            });
        }
    }
};

// Delete Account & Profile
export const deleteAccount = () => 
    async (dispatch: AppDispatch) => {
        if (
            window.confirm(
            'Are you sure you want to delete your account? This cannot be undone.'
            )
        ) {
            try {
                await axios.delete('/api/accounts');

                dispatch({ type: CLEAR_PROFILE });
                dispatch({ type: ACCOUNT_DELETED });

                dispatch(setAlert('Your account has been deleted.', 'success'));
            } catch (err) {
                if(axios.isAxiosError(err) && err.response) {
                    dispatch({
                        type: PROFILE_ERROR,
                        payload: {
                        msg: err.response.statusText,
                        status: err.response.status,
                        },
                    });
                }
            }
        }
};
