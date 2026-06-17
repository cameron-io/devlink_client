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
    const getCurrentProfile = useProfileStore((state) => state.getCurrentProfile)
    const deleteAccount = useProfileStore((state) => state.deleteAccount)
    const user = useAuthStore((state) => state.user)
    const profile = useProfileStore((state) => state.profile)
    const loading = useProfileStore((state) => state.loading)

    useEffect(() => {
        getCurrentProfile()
    }, [getCurrentProfile])

    let page = (
        <Fragment>
            <div className='container'>
                <div className='row'>
                    <h1 className="col text-primary text-start">Home</h1>
                    <div className='col text-end'>
                        <DashboardActions deleteAccount={deleteAccount} />
                    </div>
                </div>
                <div className='row'>
                    <p className="col lead">
                        <FontAwesomeIcon icon={faUser} className='me-2'/>
                        Welcome {user && user.name}
                    </p>
                </div>
            </div>
            <br></br>
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

    return loading && profile === null ? (<Spinner />) : page
}

export default Dashboard
