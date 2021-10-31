import React from 'react'
import { Panel, PanelHeader, Group, Search, CardGrid, ContentCard } from '@vkontakte/vkui'
import { Icon24Filter } from '@vkontakte/icons'
import logo from '../../../images/logo.svg'
import AdCard from '../components/AdCard'

export default function MainPanel({ id, cardsInfo, onSearchClick }) {
    return (
        <Panel id={id}>
            <PanelHeader left={<img src={logo} alt="" />}>Бытовые товары</PanelHeader>
            <Group>
                <Search
                    after={null}
                    placeholder="Поиск"
                    icon={<Icon24Filter />}
                    onIconClick={() => onSearchClick()}
                />
                <CardGrid size="l">
                    {cardsInfo.map((el, i) => {
                        return <AdCard key={el.id} data={el} />
                    })}
                </CardGrid>
            </Group>
        </Panel>
    )
}
