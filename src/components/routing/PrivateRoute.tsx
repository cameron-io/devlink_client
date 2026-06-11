import { Navigate } from 'react-router-dom'
import { FunctionComponent } from 'react'
import { useAuthStore } from '../../stores'

type Props = { component: FunctionComponent }

const PrivateRoute: FunctionComponent<Props> = ({ component: Component, ...props }) => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
    const loading = useAuthStore((state) => state.loading)

    return !isAuthenticated && !loading ? (
        <Navigate to="/login" />
    ) : (
        <Component {...props} />
    )
}

export default PrivateRoute
