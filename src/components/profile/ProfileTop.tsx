import { FunctionComponent } from 'react'
import { Profile } from '../../types/common'
import './ProfileTop.css'

type Props = { profile: Profile }

const ProfileTop: FunctionComponent<Props> = ({
    profile: {
        status,
        company,
        location,
        website,
        gitHubUsername,
        social,
        user: { name, avatar },
    },
}) => {
    return (
        <div className="profile-top bg-primary p-2">
            <img className="round-img my-1" src={'https:' + avatar} alt="" />
            <h1 className="large">{name}</h1>
            <p className="lead">
                {status} {company && <span>at {company}</span>}
            </p>
            <p>{location && <span>{location}</span>}</p>
            <div className="icons my-1">
                {gitHubUsername && (
                    <a
                        href={'https://github.com/' + gitHubUsername}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className="fas fa-brands fa-github fa-2x"></i>
                    </a>
                )}
                {website && (
                    <a
                        href={'https://' + website}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className="fas fa-globe fa-2x"></i>
                    </a>
                )}
                {social && social.twitter && (
                    <a
                        href={social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className="fab fa-twitter fa-2x"></i>
                    </a>
                )}
                {social && social.facebook && (
                    <a
                        href={social.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className="fab fa-facebook fa-2x"></i>
                    </a>
                )}
                {social && social.linkedin && (
                    <a
                        href={social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className="fab fa-linkedin fa-2x"></i>
                    </a>
                )}
                {social && social.youtube && (
                    <a
                        href={social.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className="fab fa-youtube fa-2x"></i>
                    </a>
                )}
                {social && social.instagram && (
                    <a
                        href={social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className="fab fa-instagram fa-2x"></i>
                    </a>
                )}
            </div>
        </div>
    )
}

export default ProfileTop
