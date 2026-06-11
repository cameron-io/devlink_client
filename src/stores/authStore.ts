import axios from 'axios'
import { create } from 'zustand'
import { UserDto } from '../types/api'
import useAlertStore from './alertStore'

type AuthState = {
  isAuthenticated: boolean | null
  loading: boolean
  user: UserDto | null
}

type AuthStore = AuthState & {
  loadUser: () => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  setAuth: (authState: Partial<AuthState>) => void
}

const useAuthStore = create<AuthStore>((set, get) => ({
  isAuthenticated: null,
  loading: true,
  user: null,
  setAuth: (authState) => set((state) => ({ ...state, ...authState })),

  loadUser: async () => {
    set({ loading: true })
    try {
      const res = await axios.get('/api/accounts/info', { withCredentials: true })
      set({ user: res.data, isAuthenticated: true, loading: false })
    } catch (error) {
      set({ user: null, isAuthenticated: false, loading: false })
    }
  },

  register: async (name, email, password) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const body = JSON.stringify({ name, email, password })

    try {
      await axios.post('/api/accounts/register', body, config)
      await get().loadUser()
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const errors = err.response.data.error
        if (errors) {
          errors.forEach((error: any) =>
            useAlertStore.getState().setAlert(error.msg, 'danger')
          )
        }
      }
      set({ isAuthenticated: false, loading: false })
    }
  },

  login: async (email, password) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const body = JSON.stringify({ email, password })

    try {
      await axios.post('/api/accounts/login', body, config)
      await get().loadUser()
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const errors = err.response.data.error
        if (errors) {
          errors.forEach((error: any) =>
            useAlertStore.getState().setAlert(error.msg, 'danger')
          )
        }
      }
      set({ isAuthenticated: false, loading: false })
    }
  },

  logout: async () => {
    try {
      const res = await axios.post(
        '/api/accounts/logout',
        {},
        { withCredentials: true }
      )
      if (res.status !== 200) {
        throw new Error(`Logout failure - ${res.status}`)
      }
      const profileModule = await import('./profileStore')
      profileModule.default.getState().clearProfile()
      set({ user: null, isAuthenticated: false, loading: false })
    } catch (err) {
      useAlertStore.getState().setAlert('Logout failure', 'danger')
      set({ isAuthenticated: false, loading: false })
    }
  },
}))

export default useAuthStore
