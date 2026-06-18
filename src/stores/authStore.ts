import axios from 'axios'
import { create } from 'zustand'
import useAlertStore from './alertStore'
import Keycloak, { KeycloakUserInfo } from 'keycloak-js'

type AuthState = {
    loading: boolean
    user: KeycloakUserInfo | null
    error: any
}

type AuthStore = AuthState & {
    loadUser: (keycloak: Keycloak) => Promise<void>
    logout: () => Promise<void>
    deleteUser: () => Promise<void>
}

const useAuthStore = create<AuthStore>((set, _get) => ({
    loading: true,
    user: null,
    error: null,

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
            set({ user: null, loading: false })
        } catch (err) {
            useAlertStore.getState().setAlert('Logout failure', 'danger')
            set({ loading: false })
        }
    },

    deleteUser: async () => {
        set({ loading: true })
        try {
            await axios.delete('/api/accounts')
            const profileModule = await import('./profileStore')
            profileModule.default.getState().clearProfile()
            set({ user: null, loading: false })
            useAlertStore
                .getState()
                .setAlert('Your account has been deleted.', 'success')
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

export default useAuthStore
