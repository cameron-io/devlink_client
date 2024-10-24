import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { FunctionComponent } from 'react'
import gravatar from 'gravatar'

type Props = { profile: any }

const ProfileItem: FunctionComponent<Props> = ({
    profile: {
        user: { id, name, email },
        status,
        company,
        location,
        skills,
    },
}) => {
    const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' })
    return (
        <div className="profile bg-light">
            <img src={avatar} alt="" className="round-img" />
            <div>
                <h2>{name}</h2>
                <p>
                    {status} {company && <span> at {company}</span>}
                </p>
                <p className="my-1">{location && <span>{location}</span>}</p>
                <Link to={`/profile/${id}`} className="btn btn-primary">
                    View Profile
                </Link>
            </div>
            <ul>
                {skills.slice(0, 4).map((skill: string, index: number) => (
                    <li key={index} className="text-primary">
                        <i className="fas fa-check"></i> {skill}
                    </li>
                ))}
            </ul>
        </div>
    )
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default ProfileItem
