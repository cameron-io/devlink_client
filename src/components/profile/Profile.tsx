import { Fragment, FunctionComponent, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getProfileById } from '../../actions/profile'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileExperience from './ProfileExperience'
import type { RootState } from '../../store'
import { StateAuth, StateProfile } from '../types'
import ProfileEducation from './ProfileEducation'

type Props = {
    getProfileById: (userId: string) => Promise<void>
    profile: StateProfile
    auth: StateAuth
}

const Profile: FunctionComponent<Props> = ({
    getProfileById,
    profile: { profile, loading },
    auth,
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
                    <Link to="/profiles" className="btn btn-light">
                        Back to Profiles
                    </Link>
                    {auth.isAuthenticated &&
                        auth.loading === false &&
                        auth.user!.id === profile.user.id && (
                            <Link to="/edit-profile" className="btn btn-dark">
                                Edit Profile
                            </Link>
                        )}
                    <div className="profile-grid my-1">
                        <ProfileTop profile={profile} />
                        <ProfileAbout profile={profile} />
                        <div className="profile-exp bg-white p-2">
                            <h2 className="text-primary">Experience</h2>
                            {profile.experience.length > 0 ? (
                                <Fragment>
                                    {profile.experience.map(
                                        (experience: any) => (
                                            <ProfileExperience
                                                key={experience.id}
                                                experience={experience}
                                            />
                                        )
                                    )}
                                </Fragment>
                            ) : (
                                <h4>No experience credentials</h4>
                            )}
                        </div>
                        <div className="profile-edu bg-white p-2">
                            <h2 className="text-primary">Education</h2>
                            {profile.education.length > 0 ? (
                                <Fragment>
                                    {profile.education.map(
                                        (education: any) => (
                                            <ProfileEducation
                                                key={education.id}
                                                education={education}
                                            />
                                        )
                                    )}
                                </Fragment>
                            ) : (
                                <h4>No experience credentials</h4>
                            )}
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

const mapStateToProps = (state: RootState) => ({
    profile: state.profile,
    auth: state.auth,
})

export default connect(mapStateToProps, { getProfileById })(Profile)
