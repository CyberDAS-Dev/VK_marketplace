import React from 'react'
import { View } from '@vkontakte/vkui'

import MyAdsPanel from './panels/MyAds'
import MainPanel from './panels/Main'
import AboutPanel from './panels/About'

export default function ProfileView({ id }) {
    const [activePanel, setActivePanel] = React.useState('main')
    // temp
    const [removeList] = React.useState([
        ['Графин', '300 просмотров'],
        ['Чашка', '103 просмотра'],
        ['Ноутбук', '7000 просмотров'],
    ])
    const backToMain = () => setActivePanel('main')
    const switchToAbout = () => setActivePanel('about')
    const switchToMyAds = () => setActivePanel('my-ads')

    return (
        <View id={id} activePanel={activePanel}>
            <MainPanel id="main" switchToAbout={switchToAbout} switchToMyAds={switchToMyAds} />
            <MyAdsPanel id="my-ads" backToMain={backToMain} removeList={removeList} />
            <AboutPanel id="about" backToMain={backToMain} />
        </View>
    )
}
