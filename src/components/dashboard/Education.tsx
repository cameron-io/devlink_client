import { Fragment, FunctionComponent } from 'react'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { deleteEducation } from '../../actions/profile'

type Props = {
    education?: any[]
    deleteEducation: (id: number) => Promise<void>
}

const Education: FunctionComponent<Props> = ({
    education,
    deleteEducation,
}) => {
    return (
        <Fragment>
            <h2 className="my2">Education Credentials</h2>
            {education == null || education.length == 0 ?
                (
                    <p>No Entries.</p>
                ) : (
                    <table className="table">
                    <thead>
                        <tr>
                            <th>School</th>
                            <th className="hide-sm">Degree</th>
                            <th className="hide-sm">Start Date</th>
                            <th className="hide-sm">End Date</th>
                            <th className="hide-sm">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {education.map((edu: any) => (
                            <tr key={edu.id}>
                                <td>{edu.school}</td>
                                <td className="hide-sm">{edu.degree}</td>
                                <td><Moment format="YYYY/MM/DD">{edu.from}</Moment></td>
                                <td>
                                    {edu.to === null ?
                                        (
                                            'Now'
                                        ) : (
                                            <Moment format="YYYY/MM/DD">{edu.end}</Moment>
                                        )
                                    }
                                </td>
                                <td className='hide-sm'>{edu.description}</td>
                                <td>
                                    <button
                                        onClick={() => deleteEducation(edu.id)}
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
        </Fragment>
    )
}

export default connect(null, { deleteEducation })(Education)
