import { FunctionComponent, useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { RootState } from '../../redux/store'
import { getGithubRepos } from '../../redux/dispatchers/profile';
import Spinner from '../layout/Spinner';

type Props = {
    github_username: string,
    getGithubRepos: any,
    repos: Array<any>
}

const ProfileGithub: FunctionComponent<Props> = ({
    github_username,
    getGithubRepos,
    repos
}) => {
    useEffect(() => {
        getGithubRepos(github_username)
    }, [getGithubRepos])

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

const mapStateToProps = (state: RootState) => ({
    repos: state.profile.repos
})

export default connect(mapStateToProps, {getGithubRepos})(ProfileGithub);