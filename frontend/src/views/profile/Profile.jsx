import React from 'react'
import { View } from '@vkontakte/vkui'
import MyAdsPanel from './panels/MyAds'
import AboutPanel from './panels/About'
import MainPanel from './panels/Main'

export default function ProfileView({ id }) {
    const [activePanel, setActivePanel] = React.useState('main')
    // temp
    const [removeList] = React.useState([
        ['Графин', '300 просмотров'],
        ['Чашка', '103 просмотра'],
        ['Ноутбук', '7000 просмотров'],
    ])
    const backToMain = () => setActivePanel('main')

    return (
        <View id={id} activePanel={activePanel}>
            <MainPanel id="main" setActivePanel={setActivePanel} />
            <MyAdsPanel id="myAds" removeList={removeList} backToMain={backToMain} />
            <AboutPanel id="about" backToMain={backToMain} />
        </View>
    )
}
