import { Fragment, FunctionComponent, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getProfileById } from '../../actions/profile'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileExperience from './ProfileExperience'
import type { RootState } from '../../store'

type Props = { getProfileById: any; profile: any; auth: any }

const Profile: FunctionComponent<Props> = ({
    getProfileById,
    profile: { profile, loading },
    auth,
}) => {
    const { id } = useParams()
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
                        auth.user.id === profile.user.id && (
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
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state: RootState) => ({
    profile: state.profile,
    auth: state.auth,
})

export default connect(mapStateToProps, { getProfileById })(Profile)
