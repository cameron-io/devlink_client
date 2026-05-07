import { Link } from 'react-router-dom'
import { Fragment, FunctionComponent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import Avatar from '../../components/profile/ProfileAvatar'
import { ProfileDto } from '../../types/api'

type Props = { profile: ProfileDto }

const ProfileItem: FunctionComponent<Props> = ({
    profile: {
        status,
        company,
        location,
        skills,
        user: user
    },
}) => {
    return (
        <Fragment>
            {user && (
                <div className="container border rounded-3 p-4">
                    <div className='row'>
                        <div className='col me-4' style={{maxWidth: 150}}>
                            <Avatar avatar={user.avatar} size={150}></Avatar>
                        </div>
                        <div className='col border-end'>
                            <div>
                                <h2>{user.name}</h2>
                                <p>{status} {company && <span> @ {company}</span>}</p>
                                <p>{location && <span>{location}</span>}</p>
                                <Link to={`/profile/${user.id}`} className="btn btn-primary">
                                    View Profile
                                </Link>
                            </div>
                        </div>
                        <div className='col'>
                            <div>
                                <h4 className='text-primary'>Skills</h4>
                                {skills && skills.slice(0, 4).map((skill: string, index: number) => (
                                    <div key={index} className="text-tertiary">
                                        <FontAwesomeIcon icon={faCheck} className='me-2'/>{skill}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    )
}

export default ProfileItem
