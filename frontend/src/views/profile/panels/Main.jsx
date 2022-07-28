import React from 'react'
import { Group, Panel, PanelHeader, SimpleCell, Avatar } from '@vkontakte/vkui'
import {
    Icon28DocumentOutline,
    Icon28HelpCircleOutline,
    Icon28InfoCircleOutline,
} from '@vkontakte/icons'
import logo from '@/images/logo.svg'
import avatar from '@/views/profile/images/avatar.png'

export default function MainPanel({ id, setActivePanel }) {
    return (
        <Panel id={id}>
            <PanelHeader left={<img src={logo} alt="" />}>Профиль</PanelHeader>
            <Group>
                <SimpleCell
                    before={<Avatar src={avatar} size="84" />}
                    description="Санкт-Петербург"
                >
                    Алексей Мазелюк
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
}
