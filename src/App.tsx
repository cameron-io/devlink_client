// React
import { Fragment, FunctionComponent, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// Main page
import Navbar from './components/layout/Navbar'
import Landing from './pages/Landing/Landing'
import Footer from './components/layout/Footer'
// Dashboard
import Dashboard from './pages/Dashboard/Dashboard'
// Profile
import ProfileDetailsForm from './components/profileForms/profileDetailsForm'
import AddExperience from './pages/ProfileForms/AddExperience'
import AddEducation from './pages/ProfileForms/AddEducation'
import Profile from './pages/Profile/Profile'
import Profiles from './pages/Profiles/Profiles'
// Alerts
import Alert from './components/layout/Alert'
// Auth
import { useAuthStore } from './stores'
import Keycloak from "keycloak-js";

type Props = {
    keycloak: Keycloak
}

const App: FunctionComponent<Props> = ({keycloak}) => {
    const loadUser = useAuthStore((state) => state.loadUser)

    useEffect(() => {
        loadUser(keycloak)
    }, [])

    return (
        <Router>
            {/*Group elements */}
            <Fragment>
                {/* Navigation */}
                <Navbar />
                {/* Wrap in container for padding */}
                <section className="container my-5 py-5" style={{ minHeight: '80svh' }}>
                    <Alert />
                    {/* Wrap other routes in a Switch */}
                    <Routes>
                        {/* Entry route */}
                        <Route path="/" element={<Landing />} />
                        <Route path="/profile/:id" element={<Profile />} />
                        <Route path="/profiles" element={<Profiles />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/create-profile" element={<ProfileDetailsForm />} />
                        <Route path="/edit-profile" element={<ProfileDetailsForm />} />
                        <Route path="/add-experience" element={<AddExperience />} />
                        <Route path="/add-education" element={<AddEducation />} />
                    </Routes>
                </section>
                <Footer />
            </Fragment>
        </Router>
    )
}

export default App
