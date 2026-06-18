import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// Bootstrap
import './styles/scss/styles.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import keycloak from './auth/keycloak'
import axios from 'axios'

keycloak
    .init({
        onLoad: 'login-required',
        checkLoginIframe: false,
    })
    .then((authenticated) => {
        if (!authenticated) {
            keycloak.login()
        }

        axios.defaults.headers.common = {
            Authorization: `Bearer ${keycloak.token}`,
        }

        ReactDOM.createRoot(document.getElementById('root')!).render(
            <React.StrictMode>
                <App keycloak={keycloak} />
            </React.StrictMode>
        )
    })
