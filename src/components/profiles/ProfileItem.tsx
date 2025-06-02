import { Link } from 'react-router-dom'
import { FunctionComponent } from 'react'

type Props = { profile: any }

const ProfileItem: FunctionComponent<Props> = ({
    profile: {
        user: { id, name, avatar },
        status,
        company,
        location,
        skills,
    },
}) => {
    return (
        <div className="profile bg-light">
            <img src={'https:' + avatar} alt="" className="round-img" />
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

export default ProfileItem
