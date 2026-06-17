import { FunctionComponent, useEffect, Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { useProfileStore } from '../../stores'
import Spinner from '../layout/Spinner'

type Props = {
    gitHubUsername: string
}

const ProfileGithub: FunctionComponent<Props> = ({ gitHubUsername }) => {
    const repos = useProfileStore((state) => state.repos)

    useEffect(() => {
        useProfileStore.getState().getGithubRepos(gitHubUsername)
    }, [gitHubUsername])

    return (
        <Fragment>
            <div className="card mt-4">
                <h5 className="card-header">GitHub Public Repos</h5>
                <div className="card-body">
                    <ul>
                        {repos && (
                            repos.map(repo => (
                                <li key={repo.id}>
                                    <div className='container'>
                                        <div className='row'>
                                            <h4 className='col'>
                                                <a
                                                    href={repo.html_url} 
                                                    target='_blank'
                                                    rel='noopener noreferrer'
                                                >
                                                    {repo.name}
                                                </a>
                                            </h4>
                                            <p className='col text-end'>
                                                <FontAwesomeIcon icon={faStar} className='me-1 text-warning'/>
                                                {repo.stargazers_count}
                                            </p>
                                        </div>
                                    </div>
                                    <p>{repo.description}</p>
                                </li>
                            ))
                        ) || <Spinner />}
                    </ul>
                </div>
            </div>
        </Fragment>
    );
}

export default ProfileGithub