import axios from 'axios'
import { create } from 'zustand'
import useAlertStore from './alertStore'
import Keycloak, { KeycloakUserInfo } from 'keycloak-js'

type AuthState = {
  loading: boolean
  user: KeycloakUserInfo | null
}

type AuthStore = AuthState & {
  loadUser: (keycloak: Keycloak) => Promise<void>
  logout: () => Promise<void>
  setAuth: (authState: Partial<AuthState>) => void
}

const useAuthStore = create<AuthStore>((set, _get) => ({
  loading: true,
  user: null,
  setAuth: (authState) => set((state) => ({ ...state, ...authState })),

  loadUser: async (keycloak: Keycloak) => {
    set({ loading: true })
    const user = await keycloak.loadUserInfo()
    set({ user, loading: false })
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
      set({ user: null,loading: false })
    } catch (err) {
      useAlertStore.getState().setAlert('Logout failure', 'danger')
      set({ loading: false })
    }
  },
}))

export default useAuthStore
