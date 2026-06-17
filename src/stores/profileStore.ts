import axios from 'axios'
import { create } from 'zustand'
import { ProfileDto } from '../types/api'
import useAlertStore from './alertStore'

type ProfileState = {
  profile: ProfileDto | null
  profiles: ProfileDto[]
  repos: any[]
  loading: boolean
  error: any
}

type ProfileStore = ProfileState & {
  getCurrentProfile: () => Promise<void>
  getProfiles: () => Promise<void>
  getProfileById: (userId: string) => Promise<void>
  getGithubRepos: (gitHubUsername: string) => Promise<void>
  createProfile: (formData: any, navigate: any, edit?: boolean) => Promise<void>
  addExperience: (formData: any, navigate: any) => Promise<void>
  addEducation: (formData: any, navigate: any) => Promise<void>
  deleteExperience: (id: number) => Promise<void>
  deleteEducation: (id: number) => Promise<void>
  deleteAccount: () => Promise<void>
  clearProfile: () => void
}

const useProfileStore = create<ProfileStore>((set, get) => ({
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
  clearProfile: () =>
    set({ profile: null, repos: [], loading: false, error: {} }),

  getCurrentProfile: async () => {
    set({ loading: true })
    try {
      const res = await axios.get('/api/profiles/me')
      set({ profile: res.data, loading: false })
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        set({
          error: {
            msg: err.response.statusText,
            status: err.response.status,
          },
          loading: false,
          profile: null,
        })
      } else {
        set({ loading: false, profile: null })
      }
    }
  },

  getProfiles: async () => {
    get().clearProfile()
    set({ loading: true })
    try {
      const res = await axios.get('/api/profiles')
      set({ profiles: res.data, loading: false })
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        set({
          error: {
            msg: err.response.statusText,
            status: err.response.status,
          },
          loading: false,
        })
      } else {
        set({ loading: false })
      }
    }
  },

  getProfileById: async (userId) => {
    set({ loading: true })
    try {
      const res = await axios.get(`/api/profiles/user/${userId}`)
      set({ profile: res.data, loading: false })
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        set({
          error: {
            msg: err.response.statusText,
            status: err.response.status,
          },
          loading: false,
          profile: null,
        })
      } else {
        set({ loading: false })
      }
    }
  },

  getGithubRepos: async (gitHubUsername) => {
    set({ loading: true })
    try {
      const res = await axios.get(`/api/profiles/github/${gitHubUsername}`)
      set({ repos: res.data, loading: false })
    } catch (err) {
      useAlertStore.getState().setAlert('Cannot retrieve GitHub profile', 'danger')
      set({
          loading: false,
        })
    }
  },

  createProfile: async (formData, navigate, edit = false) => {
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
      }

      let skills = formData.skills
      if (skills) {
        formData.skills = skills
          .split(',')
          .map((skill: string) => skill.trim())
      }

      const res = await axios.post('/api/profiles', formData, config)
      set({ profile: res.data, loading: false })

      useAlertStore.getState().setAlert(
        edit ? 'Profile Updated' : 'Profile Created',
        'success'
      )

      navigate('/dashboard')
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const errors = err.response.data.errors
        if (errors) {
          errors.forEach((error: any) =>
            useAlertStore.getState().setAlert(error.msg, 'danger')
          )
        }
        set({
          error: {
            msg: err.response.statusText,
            status: err.response.status,
          },
          loading: false,
        })
      } else {
        set({ loading: false })
      }
    }
  },

  addExperience: async (formData, navigate) => {
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
      }

      const res = await axios.put('/api/profiles/experience', formData, config)
      set({ profile: res.data, loading: false })
      useAlertStore.getState().setAlert('Experience Added', 'success')
      navigate('/dashboard')
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const errors = err.response.data.errors
        if (errors) {
          errors.forEach((error: any) =>
            useAlertStore.getState().setAlert(error.msg, 'danger')
          )
        }
        set({
          error: {
            msg: err.response.statusText,
            status: err.response.status,
          },
          loading: false,
        })
      } else {
        set({ loading: false })
      }
    }
  },

  addEducation: async (formData, navigate) => {
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
      }

      const res = await axios.put('/api/profiles/education', formData, config)
      set({ profile: res.data, loading: false })
      useAlertStore.getState().setAlert('Education Added', 'success')
      navigate('/dashboard')
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const errors = err.response.data.errors
        if (errors) {
          errors.forEach((error: any) =>
            useAlertStore.getState().setAlert(error.msg, 'danger')
          )
        }
        set({
          error: {
            msg: err.response.statusText,
            status: err.response.status,
          },
          loading: false,
        })
      } else {
        set({ loading: false })
      }
    }
  },

  deleteExperience: async (id) => {
    try {
      const res = await axios.delete(`/api/profiles/experience/${id}`)
      set({ profile: res.data, loading: false })
      useAlertStore.getState().setAlert('Experience Removed', 'success')
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        set({
          error: {
            msg: err.response.statusText,
            status: err.response.status,
          },
          loading: false,
        })
      } else {
        set({ loading: false })
      }
    }
  },

  deleteEducation: async (id) => {
    try {
      const res = await axios.delete(`/api/profiles/education/${id}`)
      set({ profile: res.data, loading: false })
      useAlertStore.getState().setAlert('Education Removed', 'success')
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        set({
          error: {
            msg: err.response.statusText,
            status: err.response.status,
          },
          loading: false,
        })
      } else {
        set({ loading: false })
      }
    }
  },

  deleteAccount: async () => {
    try {
      await axios.delete('/api/accounts')
      get().clearProfile()
      const authModule = await import('./authStore')
      authModule.default.getState().setAuth({ user: null, loading: false })
      useAlertStore.getState().setAlert('Your account has been deleted.', 'success')
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        set({
          error: {
            msg: err.response.statusText,
            status: err.response.status,
          },
          loading: false,
        })
      }
    }
  },
}))

export default useProfileStore
