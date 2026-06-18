import { Fragment, FunctionComponent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { ProfileDto } from '../../types/api'
import ProfileEducation from '../../components/profile/ProfileEducation'
import ProfileExperience from '../../components/profile/ProfileExperience'

type Props = { profile: ProfileDto }

const ProfileAbout: FunctionComponent<Props> = ({
    profile: { bio, education, experience, skills },
}) => (
    <Fragment>
        {bio && (
            <Fragment>
                <div className="card">
                    <h5 className="card-header">About Me</h5>
                    <div className="card-body">
                        <p>{bio}</p>
                    </div>
                </div>
            </Fragment>
        )}
        <Fragment>
            <div className="card mt-4">
                <h5 className="card-header">Skill Set</h5>
                <div className="card-body">
                    <div className="container">
                        <div className="row">
                            {skills &&
                                skills.map((skill: string, index: number) => (
                                    <div className="col" key={index}>
                                        <FontAwesomeIcon
                                            icon={faCheck}
                                            className="me-2"
                                        />
                                        {skill}
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
        <div className="card mt-4">
            <h5 className="card-header">Experience</h5>
            <div className="card-body">
                {experience && experience.length > 0 ? (
                    <Fragment>
                        {experience.map((experience: any) => (
                            <ProfileExperience
                                key={experience.id}
                                experience={experience}
                            />
                        ))}
                    </Fragment>
                ) : (
                    <p>No experience credentials</p>
                )}
            </div>
        </div>
        <div className="card mt-4">
            <h5 className="card-header">Education</h5>
            <div className="card-body">
                {education && education.length > 0 ? (
                    <Fragment>
                        {education.map((education: any) => (
                            <ProfileEducation
                                key={education.id}
                                education={education}
                            />
                        ))}
                    </Fragment>
                ) : (
                    <p>No experience credentials</p>
                )}
            </div>
        </div>
    </Fragment>
)

export default ProfileAbout
