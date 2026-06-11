import { create } from 'zustand'
import { v4 as uuid } from 'uuid'

type Alert = {
  id: string
  msg: string
  alertType: string
}

type AlertStore = {
  alerts: Alert[]
  setAlert: (msg: string, alertType: string, timeout?: number) => void
  removeAlert: (id: string) => void
}

const useAlertStore = create<AlertStore>((set) => ({
  alerts: [],
  setAlert: (msg, alertType, timeout = 5000) => {
    const id = uuid()
    set((state) => ({ alerts: [...state.alerts, { id, msg, alertType }] }))

    setTimeout(() => {
      set((state) => ({ alerts: state.alerts.filter((alert) => alert.id !== id) }))
    }, timeout)
  },
  removeAlert: (id) => set((state) => ({ alerts: state.alerts.filter((alert) => alert.id !== id) })),
}))

export default useAlertStore
