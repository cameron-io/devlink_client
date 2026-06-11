import React, { Fragment, FunctionComponent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCodeBranch } from '@fortawesome/free-solid-svg-icons'
import { useProfileStore } from '../../stores'

type Props = {}

const AddEducation: FunctionComponent<Props> = () => {
    let navigate = useNavigate()
    const addEducation = useProfileStore((state) => state.addEducation)
    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
        description: '',
    })

    const [toDateDisabled, toggleDisabled] = useState(false)

    const { school, degree, fieldofstudy, from, to, current, description } =
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
            <h1 className="text-primary">Add Your Education</h1>
            <p className="lead">
                <FontAwesomeIcon icon={faCodeBranch} className='me-2'/>
                Add any school or bootcamp you have attended
            </p>
            <div className='d-flex align-items-center py-4 bg-body-tertiary border rounded'>
                <div className='w-100 m-auto mt-4' style={{maxWidth: "330px", padding: "1rem"}}>
                    <h1 className="h3 mb-3 fw-normal">Education Details</h1>
                    <small>* = required field</small>
                    <form
                        className="form"
                        onSubmit={(e) => {
                            e.preventDefault()
                            addEducation(formData, navigate)
                        }}
                    >
                        <div className="form-floating">
                            <input
                                className='form-control'
                                type="text"
                                placeholder="* School or Bootcamp"
                                name="school"
                                value={school}
                                onChange={(e) => onChange(e)}
                                required
                            />
                            <label htmlFor="floatingInput">* School or Bootcamp</label>
                        </div>
                        <div className="form-floating">
                            <input
                                className='form-control'
                                type="text"
                                placeholder="* Degree or Certificate"
                                name="degree"
                                value={degree}
                                onChange={(e) => onChange(e)}
                                required
                            />
                            <label htmlFor="floatingInput">* Degree or Certificate</label>
                        </div>
                        <div className="form-floating">
                            <input
                                className='form-control'
                                type="text"
                                placeholder="Field of Study"
                                name="fieldofstudy"
                                value={fieldofstudy}
                                onChange={(e) => onChange(e)}
                            />
                            <label htmlFor="floatingInput">Field of Study</label>
                        </div>
                        <div className="form-floating my-3">
                            <h4>From Date</h4>
                            <input
                                className='form-control'
                                type="date"
                                name="from"
                                value={from}
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
                                Current Education
                            </p>
                        </div>
                        <div className="form-floating">
                            <h4>To Date</h4>
                            <input
                                className='form-control'
                                type="date"
                                name="to"
                                value={to}
                                onChange={(e) => onChange(e)}
                                disabled={toDateDisabled}
                            />
                        </div>
                        <div className="form-floating">
                            <textarea
                                name="description"
                                className='form-control'
                                cols={30}
                                rows={5}
                                placeholder="Programme Description"
                                value={description}
                                onChange={(e) => onChange(e)}
                            ></textarea>
                            <label htmlFor="floatingInput">Description</label>
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

export default AddEducation
