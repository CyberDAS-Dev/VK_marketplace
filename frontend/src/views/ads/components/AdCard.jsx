import React from 'react'
import ContentCard from './ContentCardCustom'

export default function AdCard({ data, maximizePhoto, onBuyButton }) {
    const defineCost = () => {
        const { cost, bargain } = data
        if (bargain) {
            return 'Договорная'
        }
        if (cost === 0) {
            return 'Бесплатно'
        }
        if (typeof cost === 'number') {
            return `${cost} ₽`
        }

        throw new Error('Указана неверная цена!')
    }

    const defineCostWording = () => {
        const { cost, bargain } = data
        if (bargain) {
            return 'Договориться о цене'
        }
        if (cost === 0) {
            return 'Забрать за бесплатно'
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
            onBuyButton={onBuyButton}
        />
    )
}
