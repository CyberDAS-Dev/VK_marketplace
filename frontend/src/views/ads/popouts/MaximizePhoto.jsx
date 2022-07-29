import { Icon24DismissDark } from '@vkontakte/icons'
import { IconButton, PopoutWrapper } from '@vkontakte/vkui'
import React from 'react'
import Zoomable from '@cyberdas/react-instagram-zoom'
import GalleryWrapper from '@/views/ads/components/GalleryWrapper'

export default function PhotoPopout({ src, index, closePopout }) {
    return (
        <PopoutWrapper alignY="center" alignX="center" onClick={closePopout}>
            <GalleryWrapper src={src} index={index}>
                {src.map((el) => {
                    return (
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                backgroundColor: '#222222',
                                width: '100%',
                                height: '70vh',
                                overflow: 'hidden',
                            }}
                        >
                            <Zoomable>
                                <img
                                    key={el}
                                    src={el}
                                    alt="Фотография товара"
                                    width="100%"
                                    height="100%"
                                    style={{
                                        borderRadius: 0,
                                    }}
                                />
                            </Zoomable>
                        </div>
                    )
                })}
            </GalleryWrapper>
            <IconButton
                style={{
                    position: 'absolute',
                    right: '5px',
                    top: '15vh',
                }}
                icon={<Icon24DismissDark />}
                onClick={closePopout}
            />
        </PopoutWrapper>
    )
}
