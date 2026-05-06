import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Fragment } from 'react'

type AvatarProps = {
    avatar: string | null | undefined
    size: number | string
}

const Avatar = (props: AvatarProps) => (
    <Fragment>
        {props.avatar 
            && 
            <img src={props.avatar} alt="" className="border rounded-3" style={{height: props.size}} /> 
            || 
            <div className="d-flex justify-content-center bg-black p-5 rounded" style={{height: props.size, width: props.size}} >
                <FontAwesomeIcon icon={faUser} className='fa-6x'/>
            </div>
        }
    </Fragment>
)

export default Avatar