// React
import { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// Redux
import { Provider } from 'react-redux'
import store from './redux/store'
// Main page
import Navbar from './components/layout/Navbar'
import Landing from './pages/Landing/Landing'
import Footer from './components/layout/Footer'
// Auth Page
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
// Dashboard
import Dashboard from './pages/Dashboard/Dashboard'
// Profile
import CreateProfile from './pages/ProfileForms/CreateProfile'
import EditProfile from './pages/ProfileForms/EditProfile'
import AddExperience from './pages/ProfileForms/AddExperience'
import AddEducation from './pages/ProfileForms/AddEducation'
import Profile from './pages/Profile/Profile'
import Profiles from './pages/Profiles/Profiles'
// Alerts
import Alert from './components/layout/Alert'
// Auth
import { loadUserAction } from './redux/dispatchers/auth'
import PrivateRoute from './components/routing/PrivateRoute'
// Style
import './assets/css/Activity.css'
import './assets/css/Forms.css'
import './assets/css/Global.css'
import './assets/css/Margin.css'
import './assets/css/Mobile.css'
import './assets/css/Padding.css'
import './assets/css/Table.css'
import './assets/css/Text.css'
import './assets/css/Utilities.css'

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
