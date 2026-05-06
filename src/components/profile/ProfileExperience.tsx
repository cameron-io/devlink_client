import { FunctionComponent, Fragment } from 'react'
import Moment from 'react-moment'
import { ExperienceDto } from '../../types/api'

type Props = { experience: ExperienceDto }

const ProfileExperience: FunctionComponent<Props> = ({
    experience: { company, title, to, from, description },
}) => {
    return (
        <Fragment>
            <h5 className="card-title">{company}</h5>
            <p className="card-text">
                {from && <Moment format="YYYY/MM/DD">{from}</Moment>} -{' '}
                {!to ? 'Now' : <Moment format="YYYY/MM/DD">{to}</Moment>}
            </p>
            <p className="card-text">
                <strong>Position: </strong> {title}
            </p>
            <p className="card-text">
                <strong>Description: </strong> {description}
            </p>
        </Fragment>
    )
}

export default ProfileExperience
