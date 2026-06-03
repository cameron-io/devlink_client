import { Fragment, FunctionComponent, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { getCurrentProfile, deleteAccount } from '../../redux/dispatchers/profile'
import DashboardActions from '../../components/dashboard/DashboardActions'
import Experience from '../../components/dashboard/Experience'
import Education from '../../components/dashboard/Education'
import Spinner from '../../components/layout/Spinner'
import { RootState } from '../../redux/store'
import { StateAuth, StateProfile } from '../../types/common'

type Props = {
    getCurrentProfile: () => Promise<void>
    deleteAccount: () => Promise<void>
    authData: StateAuth
    profileData: StateProfile
}

const Dashboard: FunctionComponent<Props> = ({
    getCurrentProfile,
    deleteAccount,
    authData: { user },
    profileData: { profile, loading },
}) => {
    useEffect(() => {getCurrentProfile()}, [getCurrentProfile])

    let page = (
        <Fragment>
            <div className='container'>
                <div className='row'>
                    <h1 className="col text-primary text-start">Dashboard</h1>
                    <div className='col text-end'>
                        <DashboardActions deleteAccount={deleteAccount} />
                    </div>
                </div>
                <div className='row'>
                    <p className="col lead">
                        <FontAwesomeIcon icon={faUser} className='me-2'/>
                        Welcome {user && user.username}
                    </p>
                </div>
            </div>
            <br></br>
            {profile && (
                <div className='container mt-3'>
                    <div className='row'>
                        <Experience experiences={profile.experiences!} />
                    </div>
                    <div className='row mt-5'>
                        <Education education={profile.educations!} />
                    </div>
                </div>
            ) || (
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
    authData: state.auth,
    profileData: state.profile,
})

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
    Dashboard
)
