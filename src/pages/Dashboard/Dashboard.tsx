import { Fragment, FunctionComponent, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import DashboardActions from '../../components/dashboard/DashboardActions'
import Experience from '../../components/dashboard/Experience'
import Education from '../../components/dashboard/Education'
import Spinner from '../../components/layout/Spinner'
import { useAuthStore, useProfileStore } from '../../stores'

type Props = {}

const Dashboard: FunctionComponent<Props> = () => {
    const {user, deleteUser} = useAuthStore()
    const {loading: profileLoading, profile, getCurrentProfile} = useProfileStore()

    useEffect(() => {
        getCurrentProfile()
    }, [])

    let page = (
        <Fragment>
            <div className='container'>
                <br />
                <div className='row'>
                    <p className="col lead">
                        <FontAwesomeIcon icon={faUser} className='me-2'/>
                        Welcome {user && user.name}
                    </p>
                </div>
                <br />
                <div className='row'>
                    <h1 className="col text-primary text-start">Dashboard</h1>
                    <div className='col text-end'>
                        <DashboardActions deleteUser={deleteUser} />
                    </div>
                </div>
            </div>
            {profile && (
                <div className='container mt-3'>
                    <div className='row'>
                        <Experience experience={profile.experience!} />
                    </div>
                    <div className='row mt-5'>
                        <Education education={profile.education!} />
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

    return profileLoading && profile === null ? (<Spinner />) : page
}

export default Dashboard
