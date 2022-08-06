import React from 'react'
import { observer } from 'mobx-react-lite'
import { ScreenSpinner, View } from '@vkontakte/vkui'
import MyAdsPanel from '@/views/profile/panels/MyAds'
import AboutPanel from '@/views/profile/panels/About'
import MainPanel from '@/views/profile/panels/Main'
import { autorun } from 'mobx'
import EditAdPanel from '@/shared/components/EditAd'
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

    const submitAd = React.useCallback(
        async (data) => {
            const isError = await myAds.submitAd(data)
            if (!isError) backToMain()
        },
        [backToMain, myAds]
    )

    const deleteAd = React.useCallback(async () => {
        const isError = await myAds.deleteAd()
        if (!isError) backToMain()
    }, [backToMain, myAds])

    return (
        <View id={id} activePanel={activePanel} popout={popout}>
            <MainPanel id="main" setActivePanel={setActivePanel} setPopout={setPopout} />
            <MyAdsPanel
                id="myAds"
                myAds={myAds}
                setActivePanel={setActivePanel}
                backToMain={backToMain}
            />
            <AboutPanel id="about" backToMain={backToMain} />
            <EditAdPanel
                id="editAd"
                currentAd={myAds.currentAd}
                deleteAd={deleteAd}
                submitAd={submitAd}
                backToMain={backToMain}
            />
        </View>
    )
})

export default ProfileView
