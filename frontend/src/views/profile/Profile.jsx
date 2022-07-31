import React from 'react'
import { observer } from 'mobx-react-lite'
import { ScreenSpinner, View } from '@vkontakte/vkui'
import MyAdsPanel from '@/views/profile/panels/MyAds'
import AboutPanel from '@/views/profile/panels/About'
import MainPanel from '@/views/profile/panels/Main'
import { autorun } from 'mobx'
import EditAdPanel from './panels/EditAd'
import MyAds from './store/MyAdsStore'

const ProfileView = observer(function ProfileView({ id }) {
    const [myAds] = React.useState(() => new MyAds())

    const [activePanel, setActivePanel] = React.useState('main')
    const [popout, setPopout] = React.useState(null)

    const backToMain = React.useCallback(() => setActivePanel('main'), [])

    React.useEffect(
        () =>
            autorun(() => {
                if (myAds.isPrefetching) {
                    setPopout(<ScreenSpinner />)
                } else if (myAds.isError) {
                    setPopout(<ScreenSpinner state="error" />)
                    setTimeout(() => setPopout(null), 1000)
                } else {
                    setPopout(null)
                }
            }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    )

    return (
        <View id={id} activePanel={activePanel} popout={popout}>
            <MainPanel id="main" setActivePanel={setActivePanel} />
            <MyAdsPanel
                id="myAds"
                myAds={myAds}
                setActivePanel={setActivePanel}
                backToMain={backToMain}
            />
            <AboutPanel id="about" backToMain={backToMain} />
            <EditAdPanel id="editAd" myAds={myAds} backToMain={backToMain} />
        </View>
    )
})

export default ProfileView
