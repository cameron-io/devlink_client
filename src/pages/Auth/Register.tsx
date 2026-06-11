import { Fragment, FunctionComponent, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuthStore, useAlertStore } from '../../stores'

type Props = {}

// Call setAlert from state properties
const Register: FunctionComponent<Props> = () => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
    const register = useAuthStore((state) => state.register)
    const setAlert = useAlertStore((state) => state.setAlert)
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

    const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (password !== password2) {
            setAlert('Passwords do not match', 'danger')
        } else {
            register(name, email, password)
        }
    }

    // Redirect if logged in
    if (isAuthenticated) {
        return <Navigate to="/dashboard" />
    }

    return (
        <Fragment>
            <h1 className="text-primary">Create Your Account.</h1>
            <p className='lead'>Please fill in the required fields.</p>
            <div className='d-flex align-items-center py-4 bg-body-tertiary border rounded'>
                <div className='w-100 m-auto mt-4' style={{maxWidth: "330px", padding: "1rem"}}>
                    <form className="form" onSubmit={(e) => onSubmit(e)}>
                        <h1 className="h3 mb-3 fw-normal">Account Details</h1>
                        <div className="form-floating mt-4">
                            <input
                                name="name"
                                className='form-control'
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => onChange(e)}
                            />
                            <label htmlFor="floatingInput">Username</label>
                        </div>
                        <div className="form-floating mt-2">
                            <input
                                name="email"
                                className='form-control'
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => onChange(e)}
                            />
                            <label htmlFor="floatingInput">Email</label>
                        </div>
                        <div className="form-floating mt-4">
                            <input
                                name="password"
                                className='form-control'
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => onChange(e)}
                            />
                            <label htmlFor="floatingInput">Password</label>
                        </div>
                        <div className="form-floating mt-2">
                            <input
                                name="password2"
                                className='form-control'
                                type="password"
                                placeholder="Confirm Password"
                                value={password2}
                                onChange={(e) => onChange(e)}
                            />
                            <label htmlFor="floatingInput">Confirm Password</label>
                        </div>
                        <input
                            type="submit"
                            className="btn btn-primary w-100 py-2 mt-4"
                            value="Register"
                        />
                    </form>
                    <p className="my-4">
                        Already have an account? <Link to="/login">Sign In</Link>
                    </p>
                </div>
            </div>
        </Fragment>
    )
}

export default Register
