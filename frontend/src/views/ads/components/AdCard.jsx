import React from 'react'
// import { ContentCard } from '@vkontakte/vkui'
import ContentCard from './ContentCardCustom'

export default function AdCard({ data }) {
    return (
        <ContentCard
            src={data.image}
            header={data.title}
            text={data.description}
            caption={`${data.cost} ₽`}
            expandable
            limit={40}
            maxHeight={150}
        />
    )
}
