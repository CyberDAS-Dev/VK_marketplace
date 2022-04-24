import React from 'react'
import { Group, Panel, PanelHeader, PanelHeaderBack, List, Cell } from '@vkontakte/vkui'

export default function MyAdsPanel({ id, removeList, backToMain }) {
    React.useEffect(() => {
        console.log(1)
    }, [])

    return (
        <Panel id={id}>
            <PanelHeader left={<PanelHeaderBack onClick={backToMain} />}>
                Мои объявления
            </PanelHeader>
            <Group>
                <List>
                    {removeList.map((el, i) => {
                        return (
                            <Cell
                                key={el[0]}
                                expandable
                                mode="removable"
                                description={el[1]}
                                onClick={(e) => console.log(el)}
                            >
                                {el[0]}
                            </Cell>
                        )
                    })}
                </List>
            </Group>
        </Panel>
    )
}
