import { Fragment, FunctionComponent, useEffect } from 'react'
import { connect } from 'react-redux'
import { getProfiles } from '../../redux/dispatchers/profile'
import ProfileItem from '../../components/profiles/ProfileItem'
import Spinner from '../../components/layout/Spinner'
import { RootState } from '../../redux/store'

type Props = { profile: any; getProfiles: any }

const Profiles: FunctionComponent<Props> = ({
    getProfiles,
    profile: { profiles, loading },
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
                    <h1 className="large text-primary">Developers</h1>
                    <p className="lead">
                        <i className="fa-solid fa-circle-nodes"></i> Browse and
                        connect with developers
                    </p>
                    <div className="profiles">
                        {profiles.length > 0 ? (
                            profiles.map((profile: any) => (
                                <ProfileItem
                                    key={profile.id}
                                    profile={profile}
                                />
                            ))
                        ) : (
                            <h4>No profiles found...</h4>
                        )}
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

const mapStateToProps = (state: RootState) => ({
    profile: state.profile,
})

export default connect(mapStateToProps, { getProfiles })(Profiles)
