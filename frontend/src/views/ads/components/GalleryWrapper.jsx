import React from 'react'
import { Gallery } from '@vkontakte/vkui'
import { observer } from 'mobx-react-lite'

const GalleryWrapper = observer(function GalleryWrapper({ children, src, index }) {
    if (src.length > 1)
        return (
            <Gallery styleWidth="100%" bullets="light" initialSlideIndex={index} showArrows>
                {children}
            </Gallery>
        )
    return <>{children}</>
})

export default GalleryWrapper
