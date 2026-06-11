import { useAlertStore } from '../../stores'

const Alert = () => {
    const alerts = useAlertStore((state) => state.alerts)

    return (
        <>
            {alerts.map((alert) => (
                <div key={alert.id} className={`alert alert-${alert.alertType}`}>
                    {alert.msg}
                </div>
            ))}
        </>
    )
}

export default Alert
