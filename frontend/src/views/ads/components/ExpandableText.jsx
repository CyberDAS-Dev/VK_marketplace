import { Text } from '@vkontakte/vkui'
import React from 'react'

export default function ExpandableText({ children, weigth, isExpanded, limit, className }) {
    return (
        <>
            {!isExpanded ? (
                <Text weigth={weigth} className={className}>{`${children.slice(
                    0,
                    limit
                )}...`}</Text>
            ) : (
                <Text weigth={weigth} className={className}>
                    {children}
                </Text>
            )}
        </>
    )
}
