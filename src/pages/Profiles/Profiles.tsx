import { Fragment, FunctionComponent, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNodes } from '@fortawesome/free-solid-svg-icons'
import ProfileItem from '../../components/profiles/ProfileItem'
import Spinner from '../../components/layout/Spinner'
import { useProfileStore } from '../../stores'
import { ProfileDto } from '../../types/api'

type Props = {}

const Profiles: FunctionComponent<Props> = () => {
    const profiles = useProfileStore((state) => state.profiles)
    const profilesLoading = useProfileStore((state) => state.loading)
    const getProfiles = useProfileStore((state) => state.getProfiles)

    useEffect(() => {
        getProfiles()
    }, [])

    return (
        <Fragment>
            {profilesLoading ? (
                <Spinner />
            ) : (
                <Fragment>
                    <h1 className="text-primary">Developers</h1>
                    <p className="lead">
                        <FontAwesomeIcon icon={faCircleNodes} className='me-2'/>
                        Browse and connect with developers
                    </p>
                    {profiles.length > 0 ? (
                        profiles.map((profile: ProfileDto) => (
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

export default Profiles
