import { Card, SimpleCell } from '@vkontakte/vkui'
import { observer } from 'mobx-react-lite'
import React from 'react'

const TypeCard = observer(function TypeCard({ title, type, selectType, Icon }) {
    return (
        <Card mode="shadow" onClick={() => selectType(type)}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 96,
                }}
            >
                <SimpleCell hasActive={false} hasHover={false} before={Icon}>
                    {title}
                </SimpleCell>
            </div>
        </Card>
    )
})

export default TypeCard
