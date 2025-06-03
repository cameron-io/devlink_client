import { Fragment, FunctionComponent, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import Spinner from '../../components/layout/Spinner'
import { getProfileById } from '../../redux/dispatchers/profile'
import ProfileTop from '../../components/profile/ProfileTop'
import ProfileAbout from '../../components/profile/ProfileAbout'
import ProfileExperience from '../../components/profile/ProfileExperience'
import type { RootState } from '../../redux/store'
import { StateAuth, StateProfile } from '../../types/common'
import ProfileEducation from '../../components/profile/ProfileEducation'
import './Profile.css'

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
