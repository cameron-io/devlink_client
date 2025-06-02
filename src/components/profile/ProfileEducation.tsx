import { FunctionComponent } from 'react'
import Moment from 'react-moment'

type Props = { education: any }

const ProfileEducation: FunctionComponent<Props> = ({
    education: { school, degree, to, from, description },
}) => {
    return (
        <div>
            <h3 className="text-dark">{school}</h3>
            <p>
                <Moment format="YYYY/MM/DD">{from}</Moment> -{' '}
                {!to ? 'Now' : <Moment format="YYYY/MM/DD">{to}</Moment>}
            </p>
            <p>
                <strong>Degree: </strong> {degree}
            </p>
            <p>
                <strong>Description: </strong> {description}
            </p>
        </div>
    )
}

export default ProfileEducation
