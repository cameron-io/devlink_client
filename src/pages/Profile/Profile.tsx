import { Fragment, FunctionComponent, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Spinner from '../../components/layout/Spinner'
import ProfileTop from '../../components/profile/ProfileTop'
import ProfileAbout from '../../components/profile/ProfileAbout'
import ProfileGithub from '../../components/profile/ProfileGithub'
import { useAuthStore, useProfileStore } from '../../stores'

type Props = {}

const Profile: FunctionComponent<Props> = () => {
    const id: string = useParams().id!
    const getProfileById = useProfileStore((state) => state.getProfileById)
    const profile = useProfileStore((state) => state.profile)
    const loading = useProfileStore((state) => state.loading)
    const authLoading = useAuthStore((state) => state.loading)
    const user = useAuthStore((state) => state.user)

    useEffect(() => {
        if (id) {
            getProfileById(id)
        }
    }, [getProfileById, id])

    return (
        <Fragment>
            {profile === null || loading ? (
                <Spinner />
            ) : (
                <Fragment>
                    <Link to="/profiles" className="btn btn-primary m-2">
                        Back to Profiles
                    </Link>
                    {authLoading === false &&
                        user?.sub === profile.user_id && (
                            <Link to="/edit-profile" className="btn border m-2">
                                Edit Profile
                            </Link>
                        )}
                    <div className="container my-1">
                        <div className='row'>
                            <div className='col'>
                                <ProfileTop profile={profile} />
                                {profile.gitHubUsername && <ProfileGithub gitHubUsername={profile.gitHubUsername} />}
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
