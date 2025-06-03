import { Fragment, FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutAction } from '../../events/dispatchers/auth'
import type { RootState } from '../../events/store'
import { StateAuth } from '../types'

type Props = {
    auth: StateAuth;
    logoutAction: () => Promise<void>
}

const Navbar: FunctionComponent<Props> = ({
    auth: { isAuthenticated, loading },
    logoutAction,
}) => {
    const authLinks = (
        <ul>
            <li>
                <Link to="/profiles">Developers</Link>
            </li>
            <li>
                <Link to="/dashboard">
                    <i className="fa fa-user" />{' '}
                    <span className="hide-sm">Dashboard</span>
                </Link>
            </li>
            <li>
                <Link onClick={logoutAction} to="#!">
                    <i className="fa fa-sign-out-alt" />{' '}
                    <span className="hide-sm">Logout</span>
                </Link>
            </li>
        </ul>
    )

    const guestLinks = (
        <ul>
            <li>
                <Link to="/profiles">Developers</Link>
            </li>
            <li>
                <Link to="/register">Register</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
        </ul>
    )

    return (
        <div>
            <nav className="navbar bg-dark">
                <h1>
                    <Link to="/">
                        <i className="fas fa-network-wired"></i> DevLink
                    </Link>
                </h1>
                {!loading && (
                    <Fragment>
                        {isAuthenticated ? authLinks : guestLinks}
                    </Fragment>
                )}
            </nav>
        </div>
    )
}

const mapStateToProps = (state: RootState) => ({
    auth: state.auth,
})

export default connect(mapStateToProps, { logoutAction })(Navbar)
