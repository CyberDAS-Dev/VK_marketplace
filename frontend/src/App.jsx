import React from 'react'
import { AppRoot, Epic, Tabbar, TabbarItem } from '@vkontakte/vkui'
import {
    Icon28MenuOutline,
    Icon28AddSquareOutline,
    Icon28UserSquareOutline,
} from '@vkontakte/icons'
import '@vkontakte/vkui/dist/vkui.css'
import baseTheme from '@vkontakte/vkui-tokens/themes/vkBase/cssVars/theme'
import { observer } from 'mobx-react-lite'
import ProfileView from '@/views/profile/Profile'
import Feed from '@/views/ads/Feed'
import AddNewView from '@/views/addNew/AddNew'

window.document.body.style.backgroundColor = baseTheme.colorBackground.normal.value

const App = observer(function App() {
    const [activeStory, setActiveStory] = React.useState('feed')
    const onStoryChange = (e) => setActiveStory(e.currentTarget.dataset.story)

    return (
        <AppRoot>
            <Epic
                activeStory={activeStory}
                tabbar={
                    <Tabbar>
                        <TabbarItem
                            onClick={onStoryChange}
                            selected={activeStory === 'feed'}
                            data-story="feed"
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
                <Feed id="feed" />
                <AddNewView id="addNew" />
                <ProfileView id="profile" />
            </Epic>
        </AppRoot>
    )
})

export default App
