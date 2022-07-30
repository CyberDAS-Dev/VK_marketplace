import React from 'react'
import { Group, Panel, PanelHeader, SimpleCell, Avatar } from '@vkontakte/vkui'
import {
    Icon28DocumentOutline,
    Icon28HelpCircleOutline,
    Icon28InfoCircleOutline,
} from '@vkontakte/icons'
import User from '@/store/UserStore'
import logo from '@/images/logo.svg'
import { observer } from 'mobx-react-lite'

const MainPanel = observer(function MainPanel({ id, setActivePanel }) {
    return (
        <Panel id={id}>
            <PanelHeader left={<img src={logo} alt="" />}>Профиль</PanelHeader>
            <Group>
                <SimpleCell before={<Avatar size={84} src={User.photo} />} description={User.city}>
                    {User.name}
                </SimpleCell>
            </Group>
            <Group>
                <SimpleCell
                    before={<Icon28DocumentOutline />}
                    expandable
                    onClick={() => setActivePanel('myAds')}
                >
                    Мои объявления
                </SimpleCell>
            </Group>
            <Group>
                <SimpleCell
                    href="https://cyberdas.net/feedback"
                    before={<Icon28HelpCircleOutline />}
                    expandable
                >
                    Помощь
                </SimpleCell>
                <SimpleCell
                    before={<Icon28InfoCircleOutline />}
                    expandable
                    onClick={() => setActivePanel('about')}
                >
                    О приложении
                </SimpleCell>
            </Group>
        </Panel>
    )
})

export default MainPanel
