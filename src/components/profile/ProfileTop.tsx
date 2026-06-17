import { Fragment, FunctionComponent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faGithub, faInstagram, faLinkedin, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { ProfileDto } from '../../types/api'
import Avatar from './ProfileAvatar'

type Props = { profile: ProfileDto }

const ProfileTop: FunctionComponent<Props> = ({
    profile: {
        status,
        company,
        location,
        website,
        gitHubUsername,
        social,
        user_id,
    },
}) => {
    return (
        <div className="d-flex justify-content-center border rounded-3 p-4 mb-4">
            <div>
                {user_id && (
                    <Fragment>
                        <Avatar avatar={undefined} size={150}></Avatar>
                        <h1 className="my-3">Name</h1>
                    </Fragment>
                )}
                <p className="lead">
                    {status} {company && <span>@ {company}</span>}
                </p>
                <p>{location && <span>{location}</span>}</p>
                <div className="my-1">
                    {gitHubUsername && (
                        <div>
                            <a
                                href={'https://github.com/' + gitHubUsername}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FontAwesomeIcon icon={faGithub} className='me-2'/>
                                {gitHubUsername}
                            </a>
                        </div>
                    )}
                    {website && (
                        <div>
                            <a
                                className='my-2'
                                href={'https://' + website}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FontAwesomeIcon icon={faGlobe} className='me-2'/>
                                {website}
                            </a>
                        </div>
                    )}
                    {social && Array.isArray(social) && social.map((item, index) => (
                        <Fragment key={index}>
                            {item.twitter && (
                                <a
                                    href={item.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FontAwesomeIcon icon={faXTwitter}/>
                                </a>
                            )}
                            {item.facebook && (
                                <a
                                    href={item.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FontAwesomeIcon icon={faFacebook}/>
                                </a>
                            )}
                            {item.linkedIn && (
                                <a
                                    href={item.linkedIn}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FontAwesomeIcon icon={faLinkedin}/>
                                </a>
                            )}
                            {item.youTube && (
                                <a
                                    href={item.youTube}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FontAwesomeIcon icon={faYoutube}/>
                                </a>
                            )}
                            {item.instagram && (
                                <a
                                    href={item.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FontAwesomeIcon icon={faInstagram}/>
                                </a>
                            )}
                        </Fragment>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProfileTop
