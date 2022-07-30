import React from 'react'
import { Card, CardGrid, Group, Panel, PanelHeader, SimpleCell } from '@vkontakte/vkui'
import {
    Icon28AdvertisingOutline,
    Icon28MoneyCircleOutline,
    Icon28ShoppingCartOutline,
    Icon28StorefrontOutline,
} from '@vkontakte/icons'
import logo from '@/images/logo.svg'
import { observer } from 'mobx-react-lite'
import TypeCard from '../components/TypeCard'

const TYPES = [
    { title: 'Продажа', type: 'sell', icon: <Icon28MoneyCircleOutline /> },
    { title: 'Покупка', type: 'buy', icon: <Icon28ShoppingCartOutline /> },
    { title: 'Услуги', type: 'service', icon: <Icon28StorefrontOutline /> },
    { title: 'Ищу мастера', type: 'performer', icon: <Icon28AdvertisingOutline /> },
]

const MainPanel = observer(function MainPanel({ id, selectType }) {
    return (
        <Panel id={id}>
            <PanelHeader left={<img src={logo} alt="" />}>Тип объявления</PanelHeader>
            <Group>
                <CardGrid size="l">
                    {TYPES.map((type) => {
                        return (
                            <TypeCard
                                title={type.title}
                                type={type.type}
                                Icon={type.icon}
                                selectType={selectType}
                            />
                        )
                    })}
                </CardGrid>
            </Group>
        </Panel>
    )
})

export default MainPanel
