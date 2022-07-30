import React from 'react'
import { View } from '@vkontakte/vkui'
import MyAdsPanel from '@/views/profile/panels/MyAds'
import AboutPanel from '@/views/profile/panels/About'
import MainPanel from '@/views/profile/panels/Main'
import { observer } from 'mobx-react-lite'

const ProfileView = observer(function ProfileView({ id }) {
    const [activePanel, setActivePanel] = React.useState('main')

    const backToMain = React.useCallback(() => setActivePanel('main'), [])

    return (
        <View id={id} activePanel={activePanel}>
            <MainPanel id="main" setActivePanel={setActivePanel} />
            <MyAdsPanel id="myAds" backToMain={backToMain} />
            <AboutPanel id="about" backToMain={backToMain} />
        </View>
    )
})

export default ProfileView
