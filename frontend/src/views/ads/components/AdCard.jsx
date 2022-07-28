import React from 'react'
import ContentCard from '@/views/ads/components/ContentCardCustom'

export default function AdCard({ data, maximizePhoto, onBuyButton }) {
    const defineCost = () => {
        const { cost, bargain } = data
        if (bargain) {
            return { value: 'Договорная', wording: 'Договориться о цене' }
        }
        if (cost === 0) {
            return { value: 'Бесплатно', wording: 'Забрать за бесплатно' }
        }
        if (typeof cost === 'number') {
            return { value: `${cost} ₽`, wording: `Купить за ${cost} ₽` }
        }

        throw new Error('Указана неверная цена!')
    }

    return (
        <ContentCard
            src={data.images}
            header={data.title}
            text={data.description}
            cost={defineCost()}
            loading="lazy"
            expandable
            limit={70}
            maxHeight={150}
            onGalleryClick={maximizePhoto}
            onBuyButton={onBuyButton}
            style={{ contentVisibility: 'auto', containIntrinsicSize: 500 }}
        />
    )
}
