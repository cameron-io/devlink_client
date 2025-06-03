import { Fragment, FunctionComponent, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCurrentProfile, deleteAccount } from '../../events/dispatchers/profile'
import DashboardActions from './DashboardActions'
import Experience from './Experience'
import Education from './Education'
import Spinner from '../layout/Spinner'
import { RootState } from '../../events/store'
import { StateAuth, StateProfile } from '../types'

type Props = {
    getCurrentProfile: () => Promise<void>
    deleteAccount: () => Promise<void>
    auth: StateAuth
    profile: StateProfile
}

const Dashboard: FunctionComponent<Props> = ({
    getCurrentProfile,
    deleteAccount,
    auth: { user },
    profile: { profile, loading },
}) => {
    useEffect(() => {getCurrentProfile()}, [getCurrentProfile])

    let page = (
        <Fragment>
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">
                <i className="fa fa-user"></i> Welcome {user && user.name}
            </p>
            {profile != null ? (
                <Fragment>
                    <DashboardActions />
                    <Experience experience={profile.experience!} />
                    <Education education={profile.education!} />

                    <div className="my-2">
                        <button
                            className="btn btn-danger"
                            onClick={() => {
                                if (window.confirm(
                                    'Are you sure you want to delete your account? This cannot be undone.'
                                )) {
                                    return deleteAccount()
                                }
                            }}
                        >
                            <i className="fas fa-trash-alt"></i> Delete My Account
                        </button>
                    </div>
                </Fragment>
            ) : (
                <Fragment>
                    <p>
                        You have not yet created a profile, please add some
                        info.
                    </p>
                    <Link to="/create-profile" className="btn btn-primary my-1">
                        Create Profile
                    </Link>
                </Fragment>
            )}
        </Fragment>
    )

    return loading && profile === null ? (<Spinner />) : page
}

const mapStateToProps = (state: RootState) => ({
    auth: state.auth,
    profile: state.profile,
})

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
    Dashboard
)
