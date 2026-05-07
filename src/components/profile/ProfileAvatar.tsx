import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Fragment } from 'react'

type AvatarProps = {
    avatar: string | null | undefined
    size: number | string
}

const Avatar = (props: AvatarProps) => (
    <Fragment>
        <div className="d-flex justify-content-center bg-black rounded" style={{height: props.size, width: props.size}} >
            {props.avatar
                &&
                <img src={props.avatar} alt="" className="border rounded-3" />
                ||
                <FontAwesomeIcon icon={faUser} className='p-4 fa-6x' />
            }
        </div>
    </Fragment>
)

export default Avatar