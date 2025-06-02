import { Link, Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import type { RootState } from '../../store'
import { FunctionComponent } from 'react'

type Props = { isAuthenticated: boolean | null }

const Landing: FunctionComponent<Props> = function ({ isAuthenticated }) {
    if (isAuthenticated) {
        return <Navigate to="/dashboard" />
    }
    return (
        <section className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1 className="x-large">The Developer Network</h1>
                    <p className="lead">Create and Showcase your Portfolio.</p>
                    <div className="buttons">
                        <Link to="/register" className="btn btn-primary">
                            Sign Up
                        </Link>
                        <Link to="/login" className="btn btn-light">
                            Login
                        </Link>
                    </div>
                    <p className="my-1">
                        Blog, share posts and get help from fellow developers!
                    </p>
                </div>
            </div>
        </section>
    )
}

const mapStateToProps = (state: RootState) => ({
    isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps)(Landing)
