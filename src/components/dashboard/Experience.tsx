import { Fragment, FunctionComponent } from 'react'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { deleteExperience } from '../../redux/dispatchers/profile'

type Props = {
    experience?: any[]
    deleteExperience: (id: number) => Promise<void>
}

const Experience: FunctionComponent<Props> = ({
    experience,
    deleteExperience,
}) => {
    return (
        <Fragment>
            <h2 className="my2">Experience Credentials</h2>
            {experience == null || experience.length == 0 ?
                (
                    <p>No Entries.</p>
                ) : (
                    <table className="table">
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Title</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {experience.map((exp: any) => (
                            <tr key={exp.id}>
                                <td>{exp.company}</td>
                                <td>{exp.title}</td>
                                <td><Moment format="YYYY/MM/DD">{exp.from}</Moment></td>
                                <td>
                                    {exp.to === null ?
                                        (
                                            'Now'
                                        ) : (
                                            <Moment format="YYYY/MM/DD">{exp.end}</Moment>
                                        )
                                    }
                                </td>
                                <td>{exp.description}</td>
                                <td>
                                    <button
                                        onClick={() => deleteExperience(exp.id)}
                                        className="btn btn-danger"
                                    >
                                        X
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                )
            }
            <br></br>
        </Fragment>
    )
}

export default connect(null, { deleteExperience })(Experience)
