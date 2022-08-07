import { Button, Text } from '@vkontakte/vkui'
import { observer } from 'mobx-react-lite'
import React from 'react'

const Expandable = observer(function Expandable({
    children,
    weigth,
    isExpanded,
    costWording,
    limit,
    className,
    onBuyButton,
    ownerId,
}) {
    const slicedChildren = children.length > limit ? `${children.slice(0, limit)}...` : children

    return !isExpanded ? (
        <Text weigth={weigth} className={className}>
            {slicedChildren}
        </Text>
    ) : (
        <>
            <Text weigth={weigth} className={className}>
                {children}
            </Text>
            <Button
                size="m"
                style={{ marginTop: 15 }}
                stretched
                onClick={() => onBuyButton(ownerId)}
            >
                {costWording}
            </Button>
        </>
    )
})

export default Expandable
