import { FormProps, Link } from 'react-router-dom'
import './DashboardActions.css'

const DashboardActions = (_props: FormProps) => {
    return (
        <div className="dash-buttons" style={{ marginBottom: '2rem' }}>
            <Link to="/edit-profile" className="btn btn-light">
                <i className="fas fa-user-circle text-primary"></i> Edit Profile
            </Link>
            <Link to="/add-experience" className="btn btn-light">
                <i className="fab fa-black-tie text-primary"></i> Add Experience
            </Link>
            <Link to="/add-education" className="btn btn-light">
                <i className="fas fa-graduation-cap text-primary"></i> Add Education
            </Link>
        </div>
    )
}

export default DashboardActions
