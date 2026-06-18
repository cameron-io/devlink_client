import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

type DashboardActionsProps = {
    deleteUser: any
}

const DashboardActions = ({ deleteUser }: DashboardActionsProps) => {
    return (
        <Fragment>
            <div className="dropdown">
                <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    Manage
                </button>
                <ul className="dropdown-menu">
                    <li>
                        <Link className="dropdown-item" to="/edit-profile">
                            <span>
                                <FontAwesomeIcon
                                    icon={faCircleUser}
                                    className="text-primary me-2"
                                />
                                Edit Profile
                            </span>
                        </Link>
                    </li>
                    <li>
                        <button
                            className="dropdown-item"
                            onClick={() => {
                                if (
                                    window.confirm(
                                        'Are you sure you want to delete your account? This cannot be undone.'
                                    )
                                ) {
                                    return deleteUser()
                                }
                            }}
                        >
                            <span>
                                <FontAwesomeIcon
                                    icon={faTrashAlt}
                                    className="text-danger me-2"
                                />
                                Delete My Account
                            </span>
                        </button>
                    </li>
                </ul>
            </div>
        </Fragment>
    )
}

export default DashboardActions
