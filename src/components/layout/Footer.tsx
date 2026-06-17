import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
    return (
        <footer className="border-top h-auto py-5">
            <div
                className="text-center"
            >
                <p style={{ fontWeight: 'bold' }}>Connect to us</p>
                <FontAwesomeIcon icon={faFacebook}/>
                <FontAwesomeIcon icon={faXTwitter} className='ms-2'/>
                <FontAwesomeIcon icon={faInstagram} className='ms-2'/>
            </div>
            <div className="text-center mt-3"
            >
                <p>
                    Copyright &copy; 2026 by Linkdev. All rights reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer
