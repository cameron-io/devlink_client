import { Fragment, FunctionComponent, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Spinner from '../../components/layout/Spinner'
import ProfileTop from '../../components/profile/ProfileTop'
import ProfileAbout from '../../components/profile/ProfileAbout'
import ProfileGithub from '../../components/profile/ProfileGithub'
import { useAuthStore, useProfileStore } from '../../stores'

type Props = {}

const Profile: FunctionComponent<Props> = () => {
    const profileId: string = useParams().id!
    const {loading: userLoading, user } = useAuthStore()
    const {loading: profileLoading, getProfileById, profile, repos: profileRepos, getGithubRepos } = useProfileStore()

    useEffect(() => {
        getProfileById(profileId)
        getGithubRepos(profile?.gitHubUsername!)
    }, [])

    return (
        <Fragment>
            {profile === null || profileLoading ? (
                <Spinner />
            ) : (
                <Fragment>
                    <Link to="/profiles" className="btn btn-primary m-2">
                        Back to Profiles
                    </Link>
                    {userLoading === false &&
                        user?.sub === profile.user_id && (
                            <Link to="/edit-profile" className="btn border m-2">
                                Edit Profile
                            </Link>
                        )}
                    <div className="container my-1">
                        <div className='row'>
                            <div className='col'>
                                <ProfileTop profile={profile} />
                                <ProfileGithub repos={profileRepos} />
                            </div>
                            <div className='col'>
                                <ProfileAbout profile={profile} />
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Profile
