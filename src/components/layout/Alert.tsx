import { connect } from 'react-redux'
import type { RootState } from '../../store'

// If alerts property contains a state alert, output div with alert.msg
const Alert = ({ alerts }: { alerts: any }) =>
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert: any) => (
        <div key={alert.id} className={`alert alert-${alert.alertType}`}>
            {alert.msg}
        </div>
    ))

// Remap redux state to property in react component
const mapStateToProps = (state: RootState) => ({
    alerts: state.alert,
})

export default connect(mapStateToProps)(Alert)
