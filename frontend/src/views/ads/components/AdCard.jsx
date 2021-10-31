import React from 'react'
// import { ContentCard } from '@vkontakte/vkui'
import ContentCard from './ContentCardCustom'

export default function AdCard({ data }) {
    return (
        <ContentCard
            src={data.image}
            header={data.title}
            text={data.description}
            cost={`${data.cost} ₽`}
            expandable
            limit={70}
            maxHeight={150}
        />
    )
}
