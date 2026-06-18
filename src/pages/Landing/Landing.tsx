import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'

type Props = {}

const Landing: FunctionComponent<Props> = function () {
    return (
        <div className="px-4 pt-3 text-center">
            <h1 className="display-4 fw-bold">The Developer Network</h1>
            <div className="col-lg-6 mx-auto">
                <p className="lead mb-4">Create and Showcase your Portfolio.</p>
                <Link to="/dashboard" className="btn btn-primary btn-lg px-4">
                    Dashboard
                </Link>
            </div>
            <br />
            <br />
            <div className="container px-5 mt-0 mb-0 pb-0">
                <img src="assets/showcase.jpg" className="img-fluid border rounded-3 shadow-lg mb-4" alt="Hero image" height="500" loading="lazy"></img>
            </div>
            <p className="mb-4">
                    Blog, share posts and get help from fellow developers!
            </p>
            <br></br>
        </div>
    )
}

export default Landing
