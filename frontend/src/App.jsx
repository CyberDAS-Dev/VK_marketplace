import React, { useState, useEffect } from 'react'
import {
    View,
    Panel,
    PanelHeader,
    PanelHeaderBack,
    Group,
    Placeholder,
    AppRoot,
    Epic,
    Tabbar,
    TabbarItem,
} from '@vkontakte/vkui'
import {
    Icon28ServicesOutline,
    Icon28MenuOutline,
    Icon28AddSquareOutline,
    Icon28UserSquareOutline,
} from '@vkontakte/icons'
import '@vkontakte/vkui/dist/vkui.css'
import AdsView from './views/ads/Ads'
import ProfileView from './views/profile/Profile'

function App() {
    const [activeStory, setActiveStory] = React.useState('ads')
    const onStoryChange = (e) => setActiveStory(e.currentTarget.dataset.story)

    return (
        <AppRoot>
            <Epic
                activeStory={activeStory}
                tabbar={
                    <Tabbar>
                        <TabbarItem
                            onClick={onStoryChange}
                            selected={activeStory === 'ads'}
                            data-story="ads"
                            text="Объявления"
                        >
                            <Icon28MenuOutline />
                        </TabbarItem>
                        <TabbarItem
                            onClick={onStoryChange}
                            selected={activeStory === 'addNew'}
                            data-story="addNew"
                            text="Создать"
                        >
                            <Icon28AddSquareOutline />
                        </TabbarItem>
                        <TabbarItem
                            onClick={onStoryChange}
                            selected={activeStory === 'profile'}
                            data-story="profile"
                            text="Профиль"
                        >
                            <Icon28UserSquareOutline />
                        </TabbarItem>
                    </Tabbar>
                }
            >
                <AdsView id="ads" />
                <View id="addNew" activePanel="addNew">
                    <Panel id="addNew">
                        <PanelHeader left={<PanelHeaderBack />}>Сервисы</PanelHeader>
                        <Group style={{ height: '1000px' }}>
                            <Placeholder icon={<Icon28ServicesOutline width={56} height={56} />} />
                        </Group>
                    </Panel>
                </View>
                <ProfileView id="profile" />
            </Epic>
        </AppRoot>
    )
}

export default App
