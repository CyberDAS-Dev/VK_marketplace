import { Button, Text } from '@vkontakte/vkui'
import React from 'react'

export default function Expandable({
    children,
    weigth,
    isExpanded,
    costWording,
    limit,
    className,
    onBuyButton,
}) {
    const slicedChildren = children.length > limit ? `${children.slice(0, limit)}...` : children

    return (
        <>
            {!isExpanded ? (
                <Text weigth={weigth} className={className}>
                    {slicedChildren}
                </Text>
            ) : (
                <>
                    <Text weigth={weigth} className={className}>
                        {children}
                    </Text>
                    <Button size="l" style={{ marginTop: 10 }} stretched onClick={onBuyButton}>
                        {costWording}
                    </Button>
                </>
            )}
        </>
    )
}
