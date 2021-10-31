import { Button, Text } from '@vkontakte/vkui'
import React from 'react'

export default function Expandable({ children, weigth, isExpanded, cost, limit, className }) {
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
                    <Button style={{ marginTop: 10 }} stretched>
                        Купить за {cost}
                    </Button>
                </>
            )}
        </>
    )
}
