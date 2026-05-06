import { FunctionComponent, Fragment } from 'react'
import Moment from 'react-moment'
import { EducationDto } from '../../types/api'

type Props = { education: EducationDto }

const ProfileEducation: FunctionComponent<Props> = ({
    education: { school, degree, to, from, description },
}) => {
    return (
        <Fragment>
            <h5 className="card-title">{school}</h5>
            <p className="card-text">
                {from && <Moment format="YYYY/MM/DD">{from}</Moment>} -{' '}
                {!to ? 'Now' : <Moment format="YYYY/MM/DD">{to}</Moment>}
            </p>
            <p className="card-text">
                <strong>Degree: </strong> {degree}
            </p>
            <p className="card-text">
                <strong>Description: </strong> {description}
            </p>
        </Fragment>
    )
}

export default ProfileEducation
