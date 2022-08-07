import { Card, SimpleCell } from '@vkontakte/vkui'
import { observer } from 'mobx-react-lite'
import React from 'react'

const TypeCard = observer(function TypeCard({ type, selectType }) {
    return (
        <Card mode="shadow" onClick={() => selectType(type.id)}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 96,
                }}
            >
                <SimpleCell hasActive={false} hasHover={false} before={type.icon}>
                    {type.title}
                </SimpleCell>
            </div>
        </Card>
    )
})

export default TypeCard
