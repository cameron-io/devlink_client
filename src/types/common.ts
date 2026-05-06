import { UserDto, ProfileDto } from './api'

export interface StateProfile {
    profile: ProfileDto | null
    loading: boolean
    profiles: ProfileDto[]
    repos: any[]
    error: any
}

export interface StateAuth {
    isAuthenticated: boolean | null
    loading: boolean
    user: UserDto | null
}
