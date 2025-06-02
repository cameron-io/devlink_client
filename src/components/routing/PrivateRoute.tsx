import { Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { RootState } from '../../store'
import { FunctionComponent } from 'react'

type Props = { component: FunctionComponent; auth: any }

const PrivateRoute: FunctionComponent<Props> = ({
    component: Component,
    auth: { isAuthenticated, loading },
    ...props
}) =>
    !isAuthenticated && !loading ? (
        // Back to login page
        <Navigate to="/login" />
    ) : (
        // Else display component
        <Component {...props} />
    )

const mapStateToProps = (state: RootState) => ({
    auth: state.auth,
})

export default connect(mapStateToProps)(PrivateRoute)
