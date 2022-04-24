import React from 'react'
// import { ContentCard } from '@vkontakte/vkui'
import ContentCard from './ContentCardCustom'

export default function AdCard({ data, maximizePhoto }) {
    const defineCost = () => {
        const { cost } = data
        if (cost === 0) {
            return 'Бесплатно'
        }
        if (cost === 'bargain') {
            return 'Договорная'
        }
        if (typeof cost === 'number') {
            return `${cost} ₽`
        }

        throw new Error('Указана неверная цена!')
    }

    const defineCostWording = () => {
        const { cost } = data
        if (cost === 0) {
            return 'Забрать за бесплатно'
        }
        if (cost === 'bargain') {
            return 'Договориться о цене'
        }
        if (typeof cost === 'number') {
            return `Купить за ${cost} ₽`
        }

        throw new Error('Указана неверная цена!')
    }

    return (
        <ContentCard
            src={data.image}
            header={data.title}
            text={data.description}
            cost={defineCost()}
            costWording={defineCostWording()}
            expandable
            limit={70}
            maxHeight={150}
            onGalleryClick={maximizePhoto}
        />
    )
}
