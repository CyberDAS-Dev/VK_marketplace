import React from 'react'
import { Cell, Group, List, Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui'

export default function MyAdsPanel({ id, backToMain, removeList }) {
    return (
        <Panel id={id}>
            <PanelHeader left={<PanelHeaderBack onClick={backToMain} />}>
                Мои объявления
            </PanelHeader>
            <Group>
                <List>
                    {removeList.map((el) => {
                        return (
                            <Cell key={el[0]} expandable removable description={el[1]}>
                                {el[0]}
                            </Cell>
                        )
                    })}
                </List>
            </Group>
        </Panel>
    )
}
