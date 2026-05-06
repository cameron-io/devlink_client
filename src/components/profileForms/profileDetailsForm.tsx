import { Fragment, useState, useEffect, FunctionComponent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faInstagram, faLinkedin, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { createProfile, getCurrentProfile } from '../../redux/dispatchers/profile'
import { RootState } from '../../redux/store'
import { StateProfile } from '../../types/common'

type Props = {
    createProfile: any;
    profileData: StateProfile;
    getCurrentProfile: any
}

const ProfileDetailsForm: FunctionComponent<Props> = ({
    profileData,
    createProfile,
    getCurrentProfile
}) => {
    let navigate = useNavigate()
    const [formData, setFormData] = useState({
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        gitHubUsername: '',
        bio: '',
        social: {
            twitter: '',
            facebook: '',
            linkedIn: '',
            youTube: '',
            instagram: '',
        },
    })

    const [displaySocialInputs, toggleSocialInputs] = useState(false)

    const {
        company,
        website,
        location,
        status,
        skills,
        gitHubUsername,
        bio,
        social
    } = formData

    if (profileData.profile) {
        var { profile, loading } = profileData

        useEffect(() => {
            setFormData({
                company: loading || !profile.company ? '' : profile.company,
                website: loading || !profile.website ? '' : profile.website,
                location: loading || !profile.location ? '' : profile.location,
                status: loading || !profile.status ? '' : profile.status,
                skills: loading || !profile.skills ? '' : Array.isArray(profile.skills) ? profile.skills.join(', ') : profile.skills,
                gitHubUsername: loading || !profile.gitHubUsername ? '' : profile.gitHubUsername,
                bio: loading || !profile.bio ? '' : profile.bio,
                social: loading || !profile.social ? {
                    twitter: '',
                    facebook: '',
                    linkedIn: '',
                    youTube: '',
                    instagram: '',
                } : {
                    twitter: profile.social?.twitter || '',
                    facebook: profile.social?.facebook || '',
                    linkedIn: profile.social?.linkedIn || '',
                    youTube: profile.social?.youTube || '',
                    instagram: profile.social?.instagram || '',
                },
            })
        }, [
            loading,
            getCurrentProfile,
            profile.company,
            profile.website,
            profile.location,
            profile.status,
            profile.skills,
            profile.gitHubUsername,
            profile.bio,
            profile.social,
        ])
    }

    const onChange = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
            | React.ChangeEvent<HTMLSelectElement>
    ) => {
        if (e.target.name.startsWith('social.')) {
            const socialField = e.target.name.split('.')[1]
            setFormData({
                ...formData,
                social: {
                    ...formData.social,
                    [socialField]: e.target.value,
                },
            })
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value })
        }
    }

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // call action
        createProfile(formData, navigate, true)
    }

    return (
        <Fragment>
            <h1 className="text-primary">Customize your Profile</h1>
            <p className="lead">
                <FontAwesomeIcon icon={faUser} className='me-2'/> Let's make your profile stand out.
            </p>
            <div className='d-flex align-items-center py-4 bg-body-tertiary border rounded'>
                <div className='w-100 m-auto' style={{maxWidth: "330px", padding: "1rem"}}>
                    <h1 className="h3 mb-3 fw-normal">Your Details</h1>
                    <small>* = required field</small>
                    <form className="form" onSubmit={(e) => onSubmit(e)}>
                        <div className="form-text">
                            <select
                                className='form-select'
                                name="status"
                                defaultValue={status}
                                onChange={(e) => onChange(e)}
                            >
                                <option value="0">* Select Professional Status</option>
                                <option value="Developer">Developer</option>
                                <option value="Junior Developer">
                                    Junior Developer
                                </option>
                                <option value="Senior Developer">
                                    Senior Developer
                                </option>
                                <option value="Manager">Manager</option>
                                <option value="Student or Learning">
                                    Student or Learning
                                </option>
                                <option value="Instructor">
                                    Instructor or Teacher
                                </option>
                                <option value="Intern">Intern</option>
                                <option value="Other">Other</option>
                            </select>
                            <small className="form-text">
                                Give us an idea of where you are at in your career
                            </small>
                        </div>
                        <div className="form-text mt-3">
                            <input
                                className='form-control'
                                type="text"
                                placeholder="Company"
                                name="company"
                                defaultValue={company}
                                onChange={(e) => onChange(e)}
                            />
                            <small className="form-text">
                                Could be your own company or one you work for
                            </small>
                        </div>
                        <div className="form-text mt-3">
                            <input
                                className='form-control'
                                type="text"
                                placeholder="Website"
                                name="website"
                                defaultValue={website}
                                onChange={(e) => onChange(e)}
                            />
                            <small className="form-text">
                                Could be your own or a company website
                            </small>
                        </div>
                        <div className="form-text mt-3">
                            <input
                                className='form-control'
                                type="text"
                                placeholder="Location"
                                name="location"
                                defaultValue={location}
                                onChange={(e) => onChange(e)}
                            />
                            <small className="form-text">
                                City & state suggested (eg. Boston, MA)
                            </small>
                        </div>
                        <div className="form-text mt-3">
                            <input
                                className='form-control'
                                type="text"
                                placeholder="* Skills"
                                name="skills"
                                defaultValue={skills}
                                onChange={(e) => onChange(e)}
                            />
                            <small className="form-text">
                                Please use comma separated values (eg.
                                HTML,CSS,JavaScript,PHP)
                            </small>
                        </div>
                        <div className="form-text mt-3">
                            <input
                                className='form-control'
                                type="text"
                                placeholder="Github Username"
                                name="gitHubUsername"
                                defaultValue={gitHubUsername}
                                onChange={(e) => onChange(e)}
                            />
                            <small className="form-text">
                                If you want your latest repos and a Github link, include
                                your username
                            </small>
                        </div>
                        <div className="form-text mt-3">
                            <textarea
                                className='form-control'
                                placeholder="A short bio of yourself"
                                name="bio"
                                defaultValue={bio}
                                onChange={(e) => onChange(e)}
                            ></textarea>
                            <small className="form-text">
                                Tell us a little about yourself
                            </small>
                        </div>

                        <div className="mt-3">
                            <button
                                onClick={() => toggleSocialInputs(!displaySocialInputs)}
                                type="button"
                                className="btn border"
                            >
                                Add Social Network Links
                            </button>
                            <small className="form-text mx-3">
                                Optional
                            </small>
                        </div>

                        {displaySocialInputs && (
                            <Fragment>
                                <div className='border rounded p-3'>
                                    <div className="form-text social-input">
                                        <input
                                            className='mx-3 rounded'
                                            type="text"
                                            placeholder="Twitter URL"
                                            name="social.twitter"
                                            defaultValue={social.twitter}
                                            onChange={(e) => onChange(e)}
                                        />
                                        <FontAwesomeIcon icon={faXTwitter}/>
                                    </div>

                                    <div className="form-text social-input">
                                        <input
                                            className='mx-3 rounded'
                                            type="text"
                                            placeholder="Facebook URL"
                                            name="social.facebook"
                                            defaultValue={social.facebook}
                                            onChange={(e) => onChange(e)}
                                        />
                                        <FontAwesomeIcon icon={faFacebook}/>
                                    </div>

                                    <div className="form-text social-input">
                                        <input
                                            className='mx-3 rounded'
                                            type="text"
                                            placeholder="YouTube URL"
                                            name="social.youTube"
                                            defaultValue={social.youTube}
                                            onChange={(e) => onChange(e)}
                                        />
                                        <FontAwesomeIcon icon={faYoutube}/>
                                    </div>

                                    <div className="form-text social-input">
                                        <input
                                            className='mx-3 rounded'
                                            type="text"
                                            placeholder="Linkedin URL"
                                            name="social.linkedIn"
                                            defaultValue={social.linkedIn}
                                            onChange={(e) => onChange(e)}
                                        />
                                        <FontAwesomeIcon icon={faLinkedin}/>
                                    </div>

                                    <div className="form-text social-input">
                                        <input
                                            className='mx-3 rounded'
                                            type="text"
                                            placeholder="Instagram URL"
                                            name="social.instagram"
                                            defaultValue={social.instagram}
                                            onChange={(e) => onChange(e)}
                                        />
                                        <FontAwesomeIcon icon={faInstagram}/>
                                    </div>
                                </div>
                            </Fragment>
                        )}

                        <input type="submit" className="btn btn-primary mt-4" />
                        <Link className="btn border mt-4 mx-2" to="/dashboard">
                            Go Back
                        </Link>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

const mapStateToProps = (state: RootState) => ({
    profileData: state.profile,
})

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
    ProfileDetailsForm
)
