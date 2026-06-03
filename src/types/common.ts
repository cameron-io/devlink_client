import { User, ProfileDetail } from './api'

export interface StateProfile {
    profile: ProfileDetail | null
    loading: boolean
    profiles: ProfileDetail[]
    repos: any[]
    error: any
}

export interface StateAuth {
    isAuthenticated: boolean | null
    loading: boolean
    user: User | null
}
