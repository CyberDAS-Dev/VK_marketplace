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
    return (
        <>
            {!isExpanded ? (
                <Text weigth={weigth} className={className}>{`${children.slice(
                    0,
                    limit
                )}...`}</Text>
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
