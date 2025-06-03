export interface User {
    id: string
    name: string
    email: string
    avatar: string
    date: string
}

export interface Social {
    facebook: string
    youtube: string
    twitter: string
    linkedin: string
    instagram: string
}

export interface Profile {
    id: string
    user: User
    company: string
    website: string
    location: string
    status: string
    gitHubUsername: string
    social: Social
    skills: string[]
    bio: string
    experience: any[]
    education: any[]
    date: string
}

export interface StateProfile {
    profile: Profile | null
    loading: boolean
    profiles: Profile[]
    repos: any[]
    error: any
}

export interface StateAuth {
    isAuthenticated: boolean | null
    loading: boolean
    user: User | null
}
