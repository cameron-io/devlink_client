import { Fragment, FunctionComponent, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { loginAction } from '../../redux/dispatchers/auth'
import { RootState } from '../../redux/store'

type Props = {
    loginAction: (username: string, password: string) => Promise<void>
    isAuthenticated: boolean | null
}

const Login: FunctionComponent<Props> = ({ loginAction, isAuthenticated }) => {
    // Set login fields in initialState
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    })

    // Allows to pull fields without formData.name etc
    // To be used in name={*}
    const { username, password } = formData

    // onChange required to allow field input
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // ... is a spread operator to copy the initialized formData fields
        // target is set to direct each input value to all inputs with name='*'
        if (e.target) {
            setFormData({ ...formData, [e.target.name]: e.target.value })
        }
    }

    const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        loginAction(username, password)
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
            <h1 className="text-primary">Sign Into Your Account.</h1>
            <p className='lead'>Let's get you connected.</p>
            <div className='d-flex align-items-center py-4 bg-body-tertiary border rounded'>
                <div className='w-100 m-auto mt-4' style={{maxWidth: "330px", padding: "1rem"}}>
                    <h1 className="h3 mb-3 fw-normal">Login Details</h1>
                    <form className="form" onSubmit={(e) => onSubmit(e)}>
                        <div className="form-floating mt-4">
                            <input
                                type="username"
                                className='form-control'
                                placeholder="Username"
                                name="username"
                                value={username}
                                onChange={(e) => onChange(e)}
                                required
                            />
                            <label htmlFor="floatingInput">Username</label>
                        </div>
                        <div className="form-floating mt-2">
                            <input
                                type="password"
                                className='form-control'
                                placeholder="Password"
                                name="password"
                                value={password}
                                onChange={(e) => onChange(e)}
                                minLength={6}
                            />
                            <label htmlFor="floatingInput">Password</label>
                        </div>
                        <input
                            type="submit"
                            className="btn btn-primary w-100 py-2 mt-4"
                            value="Login"
                        />
                    </form>
                    <p className="my-4">
                        Don't have an account? <Link to="/register">Sign Up</Link>
                    </p>
                </div>
            </div>
        </Fragment>
    )
}

const mapStateToProps = (state: RootState) => ({
    isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { loginAction })(Login)
