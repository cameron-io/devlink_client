import { Fragment, FunctionComponent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCodeBranch } from '@fortawesome/free-solid-svg-icons'
import { addExperience } from '../../redux/dispatchers/profile'

type Props = { addExperience: any }

const AddExperience: FunctionComponent<Props> = ({ addExperience }) => {
    let navigate = useNavigate()
    const [formData, setFormData] = useState({
        company: '',
        title: '',
        location: '',
        from_date: '',
        to_date: null,
        current: false,
        description: '',
    })

    const [toDateDisabled, toggleDisabled] = useState(false)

    const { company, title, location, from_date, to_date, current, description } =
        formData

    const onChange = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
    ) =>
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })

    return (
        <Fragment>
            <h1 className="text-primary">Add An Experience</h1>
            <p className="lead">
                <FontAwesomeIcon icon={faCodeBranch} className='me-2'/>
                Add any developer/programming positions that you have had in the past
            </p>
            <div className='d-flex align-items-center py-4 bg-body-tertiary border rounded'>
                <div className='w-100 m-auto mt-4' style={{maxWidth: "330px", padding: "1rem"}}>
                    <h1 className="h3 mb-3 fw-normal">Work Experience Details</h1>
                    <small>* = required field</small>
                    <form
                        className="form"
                        onSubmit={(e) => {
                            e.preventDefault()
                            addExperience(formData, navigate)
                        }}
                    >
                        <div className="form-floating">
                            <input
                                className='form-control'
                                type="text"
                                placeholder="* Job Title"
                                name="title"
                                value={title}
                                onChange={(e) => onChange(e)}
                                required
                            />
                            <label htmlFor="floatingInput">* Job Title</label>
                        </div>
                        <div className="form-floating">
                            <input
                                className='form-control'
                                type="text"
                                placeholder="* Company"
                                name="company"
                                value={company}
                                onChange={(e) => onChange(e)}
                                required
                            />
                            <label htmlFor="floatingInput">* Company</label>
                        </div>
                        <div className="form-floating">
                            <input
                                className='form-control'
                                type="text"
                                placeholder="Location"
                                name="location"
                                value={location}
                                onChange={(e) => onChange(e)}
                            />
                            <label htmlFor="floatingInput">Location</label>
                        </div>
                        <div className="form-floating my-3">
                            <h4>From Date</h4>
                            <input
                                className='form-control'
                                type="date"
                                name="from_date"
                                value={from_date}
                                onChange={(e) => onChange(e)}
                            />
                        </div>
                        <div className="form-check my-3">
                            <p>
                                <input
                                    className='form-check-input'
                                    type="checkbox"
                                    name="current"
                                    checked={current}
                                    value={current.toString()}
                                    onChange={(_e) => {
                                        setFormData({ ...formData, current: !current })
                                        toggleDisabled(!toDateDisabled)
                                    }}
                                />{' '}
                                Current Job
                            </p>
                        </div>
                        <div className="form-floating">
                            <h4>To Date</h4>
                            <input
                                className='form-control'
                                type="date"
                                name="to_date"
                                value={to_date == null ? '' : to_date}
                                onChange={(e) => onChange(e)}
                                disabled={toDateDisabled}
                            />
                        </div>
                        <div className="form-floating">
                            <textarea
                                className='form-control'
                                name="description"
                                cols={30}
                                rows={5}
                                placeholder="Job Description"
                                value={description}
                                onChange={(e) => onChange(e)}
                            ></textarea>
                            <label htmlFor="floatingInput">Job Description</label>
                        </div>
                        <input type="submit" className="btn btn-primary my-1" />
                        <Link className="btn border my-3 mx-2" to="/dashboard">
                            Go Back
                        </Link>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default connect(null, { addExperience })(AddExperience)
