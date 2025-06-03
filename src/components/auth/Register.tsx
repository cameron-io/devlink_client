import { Fragment, FunctionComponent, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
// Redux
import { connect } from 'react-redux'
import { setAlert } from '../../events/dispatchers/alert'
import { registerAction } from '../../events/dispatchers/auth'
import { RootState } from '../../events/store'

type Props = {
    setAlert: any
    registerAction: (name: string, email: string, password: string) => Promise<void>
    isAuthenticated: boolean | null
}

// Call setAlert from state properties
const Register: FunctionComponent<Props> = ({
    setAlert,
    registerAction,
    isAuthenticated,
}) => {
    // Set registration fields in initialState
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    })

    // Allows to pull fields without formData.name etc
    // To be used in name={*}
    const { name, email, password, password2 } = formData

    // onChange required to allow field input
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        // ... is a spread operator to copy the initialized formData fields
        // target is set to direct each input value to all inputs with name='*'
        setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (password !== password2) {
            // Call state property
            setAlert('Passwords do not match', 'danger')
        } else {
            registerAction(name, email, password)
        }
    }

    // Redirect if logged in
    if (isAuthenticated) {
        return <Navigate to="/dashboard" />
    }

    // Within html elements:
    // Add value:{*} with * = each formData field
    // Match formData fields to name='*' for simplicity
    // Add onChange for input fields
    // Replace <a href></a> with <Link to></Link>
    return (
        <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Create Your Account
            </p>
            <form className="form" onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={name}
                        onChange={(e) => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={(e) => onChange(e)}
                    />
                    <small className="form-text">
                        This site uses Gravatar so if you want a profile image,
                        use a Gravatar email
                    </small>
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={(e) => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        value={password2}
                        onChange={(e) => onChange(e)}
                    />
                </div>
                <input
                    type="submit"
                    className="btn btn-primary"
                    value="Register"
                />
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </Fragment>
    )
}

const mapStateToProps = (state: RootState) => ({
    isAuthenticated: state.auth.isAuthenticated,
})

// Export the action in order to map it to state properties
export default connect(mapStateToProps, { setAlert, registerAction })(Register)
