import { Fragment, FunctionComponent } from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { useProfileStore } from '../../stores'

type Props = {
    education?: any[]
}

const Education: FunctionComponent<Props> = ({ education }) => {
    const deleteEducation = useProfileStore((state) => state.deleteEducation)
    return (
        <Fragment>
            <h2 className="my2">Education Credentials</h2>
            {education == null || education.length == 0 ? (
                <p>No Entries.</p>
            ) : (
                <div className="table-responsive">
                    <table className="table table-striped-columns">
                        <thead>
                            <tr>
                                <th scope="col">School</th>
                                <th scope="col">Degree</th>
                                <th scope="col">Started</th>
                                <th scope="col">Until</th>
                                <th scope="col">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {education.map((edu: any) => (
                                <tr key={edu.id}>
                                    <td>{edu.school}</td>
                                    <td>{edu.degree}</td>
                                    <td>
                                        <Moment format="YYYY/MM/DD">
                                            {edu.from}
                                        </Moment>
                                    </td>
                                    <td>
                                        {edu.to === null ? (
                                            'Now'
                                        ) : (
                                            <Moment format="YYYY/MM/DD">
                                                {edu.end}
                                            </Moment>
                                        )}
                                    </td>
                                    <td>{edu.description}</td>
                                    <button
                                        onClick={() => deleteEducation(edu.id)}
                                        className="btn btn-danger"
                                    >
                                        <FontAwesomeIcon
                                            icon={faTrash}
                                            className="text-danger"
                                        />
                                    </button>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <div
                className="border text-center rounded-3 mt-3"
                style={{ width: 200 }}
            >
                <Link className="btn" to="/add-education">
                    <span>
                        <FontAwesomeIcon
                            icon={faGraduationCap}
                            className="text-primary me-2"
                        />
                        Add Education
                    </span>
                </Link>
            </div>
        </Fragment>
    )
}

export default Education
