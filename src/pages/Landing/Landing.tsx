import { Link, Navigate } from 'react-router-dom'
import { FunctionComponent } from 'react'
import { useAuthStore } from '../../stores'

type Props = {}

const Landing: FunctionComponent<Props> = function () {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

    if (isAuthenticated) {
        return <Navigate to="/dashboard" />
    }
    return (
        <div className="px-4 pt-3 text-center">
            <h1 className="display-4 fw-bold">The Developer Network</h1>
            <div className="col-lg-6 mx-auto">
                <p className="lead mb-4">Create and Showcase your Portfolio.</p>
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
                    <Link to="/register" className="btn btn-primary btn-lg px-4 me-sm-3">
                        Sign Up
                    </Link>
                    <Link to="/login" className="btn btn-outline-secondary btn-lg px-4">
                        Login
                    </Link>
                </div>
            </div>
            <div className="container px-5 mt-0 mb-0 pb-0">
                <img src="assets/showcase.jpg" className="img-fluid border rounded-3 shadow-lg mb-4" alt="Hero image" height="500" loading="lazy"></img>
            </div>
            <p className="mb-4">
                    Blog, share posts and get help from fellow developers!
            </p>
        </div>
    )
}

export default Landing
