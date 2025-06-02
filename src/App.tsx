// React
import { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// Redux
import { Provider } from 'react-redux'
import store from './store'
// Main page
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Footer from './components/layout/Footer'
// Auth Page
import Register from './components/auth/Register'
import Login from './components/auth/Login'
// Dashboard
import Dashboard from './components/dashboard/Dashboard'
// Profile
import CreateProfile from './components/profile-forms/CreateProfile'
import EditProfile from './components/profile-forms/EditProfile'
import AddExperience from './components/profile-forms/AddExperience'
import AddEducation from './components/profile-forms/AddEducation'
import Profile from './components/profile/Profile'
import Profiles from './components/profiles/Profiles'
// Alerts
import Alert from './components/layout/Alert'
// Auth
import { loadUserAction } from './actions/auth'
import PrivateRoute from './components/routing/PrivateRoute'
// Style
import './static/css/Activity.css'
import './static/css/Forms.css'
import './static/css/Global.css'
import './static/css/Margin.css'
import './static/css/Mobile.css'
import './static/css/Navbar.css'
import './static/css/Padding.css'
import './static/css/Table.css'
import './static/css/Text.css'
import './static/css/Utilities.css'
import './static/css/pages/Landing.css'
import './static/css/pages/Posts.css'
import './static/css/pages/Profile.css'
import './static/css/pages/Profiles.css'

const App = () => {
    useEffect(() => {
        var user = loadUserAction()
        store.dispatch(user)
    }, [])

    return (
        // Connects React app to Redux
        <Provider store={store}>
            <Router>
                {/*Group elements */}
                <Fragment>
                    {/* Navigation */}
                    <Navbar />
                    {/* Wrap in container for padding */}
                    <section className="container">
                        <Alert />
                        {/* Wrap other routes in a Switch */}
                        <Routes>
                            {/* Entry route */}
                            <Route path="/" element={<Landing />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/profile/:id" element={<Profile />} />
                            <Route path="/profiles" element={<Profiles />} />
                            <Route
                                path="/dashboard"
                                element={<PrivateRoute component={Dashboard} />}
                            />
                            <Route
                                path="/create-profile"
                                element={
                                    <PrivateRoute component={CreateProfile} />
                                }
                            />
                            <Route
                                path="/edit-profile"
                                element={
                                    <PrivateRoute component={EditProfile} />
                                }
                            />
                            <Route
                                path="/add-experience"
                                element={
                                    <PrivateRoute component={AddExperience} />
                                }
                            />
                            <Route
                                path="/add-education"
                                element={
                                    <PrivateRoute component={AddEducation} />
                                }
                            />
                        </Routes>
                    </section>
                    <Footer></Footer>
                </Fragment>
            </Router>
        </Provider>
    )
}

export default App
