import { Fragment, FunctionComponent, useEffect } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNodes } from '@fortawesome/free-solid-svg-icons'
import { getProfiles } from '../../redux/dispatchers/profile'
import ProfileItem from '../../components/profiles/ProfileItem'
import Spinner from '../../components/layout/Spinner'
import { RootState } from '../../redux/store'
import { ProfileDetail } from '../../types/api'

type Props = { profileData: any; getProfiles: any }

const Profiles: FunctionComponent<Props> = ({
    getProfiles,
    profileData: { profiles, loading },
}) => {
    useEffect(() => {
        getProfiles()
    }, [getProfiles])

    return (
        <Fragment>
            {loading ? (
                <Spinner />
            ) : (
                <Fragment>
                    <h1 className="text-primary">Developers</h1>
                    <p className="lead">
                        <FontAwesomeIcon icon={faCircleNodes} className='me-2'/>
                        Browse and connect with developers
                    </p>
                    {profiles.length > 0 ? (
                        profiles.map((profile: ProfileDetail) => (
                            <ProfileItem
                                key={profile.id}
                                profile={profile}
                            />
                        ))
                    ) : (
                        <h4>No profiles found...</h4>
                    )}
                </Fragment>
            )}
        </Fragment>
    )
}

const mapStateToProps = (state: RootState) => ({
    profileData: state.profile,
})

export default connect(mapStateToProps, { getProfiles })(Profiles)
