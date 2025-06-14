import { Fragment, FunctionComponent } from 'react'
import { Profile } from '../../types/common'
import './ProfileAbout.css'

type Props = { profile: Profile }

const ProfileAbout: FunctionComponent<Props> = ({
    profile: {
        bio,
        skills,
        user: { name },
    },
}) => (
    <div className="profile-about bg-light p-2">
        {bio && (
            <Fragment>
                <h2 className="text-primary">
                    {name.trim().split(' ')[0]}'s Bio
                </h2>
                <p>{bio}</p>
                <div className="line"></div>
            </Fragment>
        )}
        <h2 className="text-primary">Skill Set</h2>
        <div className="skills">
            {skills.map((skill: string, index: number) => (
                <div key={index} className="p-1">
                    <i className="fa fa-check"></i> {skill}
                </div>
            ))}
        </div>
    </div>
)

export default ProfileAbout
