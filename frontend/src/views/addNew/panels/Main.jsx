import React from 'react'
import { CardGrid, Group, Panel, PanelHeader } from '@vkontakte/vkui'
import logo from '@/images/logo.svg'
import { observer } from 'mobx-react-lite'
import { TYPES } from '@/utils/constants'
import TypeCard from '../components/TypeCard'

const MainPanel = observer(function MainPanel({ id, selectType }) {
    return (
        <Panel id={id}>
            <PanelHeader left={<img src={logo} alt="" />}>Тип объявления</PanelHeader>
            <Group>
                <CardGrid size="l">
                    {TYPES.map((type) => {
                        return <TypeCard key={type.id} type={type} selectType={selectType} />
                    })}
                </CardGrid>
            </Group>
        </Panel>
    )
})

export default MainPanel
