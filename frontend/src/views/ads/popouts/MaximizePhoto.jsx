import { Icon24DismissDark } from '@vkontakte/icons'
import { IconButton, PopoutWrapper } from '@vkontakte/vkui'
import React from 'react'
import GalleryWrapper from '../components/GalleryWrapper'

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
                            }}
                        >
                            <img
                                key={el}
                                src={el}
                                alt="Фотография товара"
                                width="100%"
                                height="auto"
                                style={{
                                    borderRadius: 0,
                                }}
                            />
                        </div>
                    )
                })}
            </GalleryWrapper>
            <IconButton
                style={{
                    position: 'absolute',
                    right: '5px',
                    top: '40px',
                }}
                icon={<Icon24DismissDark />}
                onClick={closePopout}
            />
        </PopoutWrapper>
    )
}
