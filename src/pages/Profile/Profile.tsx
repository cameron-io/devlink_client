import { Fragment, FunctionComponent, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import Spinner from '../../components/layout/Spinner'
import { getProfileById } from '../../redux/dispatchers/profile'
import ProfileTop from '../../components/profile/ProfileTop'
import ProfileAbout from '../../components/profile/ProfileAbout'
import type { RootState } from '../../redux/store'
import { StateAuth, StateProfile } from '../../types/common'
import ProfileGithub from '../../components/profile/ProfileGithub'

type Props = {
    getProfileById: (userId: string) => Promise<void>
    profileData: StateProfile
    authData: StateAuth
}

const Profile: FunctionComponent<Props> = ({
    getProfileById,
    profileData: { profile, loading },
    authData,
}) => {
    const id: string = useParams().id!

    useEffect(() => {
        getProfileById(id)
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
                    {authData.isAuthenticated &&
                        authData.loading === false &&
                        authData.user!.id === profile.user?.id && (
                            <Link to="/edit-profile" className="btn border m-2">
                                Edit Profile
                            </Link>
                        )}
                    <div className="container my-1">
                        <div className='row'>
                            <div className='col'>
                                <ProfileTop profile={profile} />
                                {profile.github_username && <ProfileGithub github_username={profile.github_username} />}
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

const mapStateToProps = (state: RootState) => ({
    profileData: state.profile,
    authData: state.auth,
})

export default connect(mapStateToProps, { getProfileById })(Profile)
