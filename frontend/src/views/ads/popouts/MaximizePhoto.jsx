import { Icon24DismissDark } from '@vkontakte/icons'
import { Gallery, IconButton, PopoutWrapper } from '@vkontakte/vkui'
import React from 'react'
import useScrollLock from '../../../utils/lockScroll'

export default function PhotoPopout({ src, index, closePopout }) {
    const { unlockScroll } = useScrollLock()

    return (
        <PopoutWrapper alignY="center" alignX="center" onClick={closePopout}>
            <Gallery
                styleWidth="100%"
                bullets="light"
                initialSlideIndex={index}
                showArrows
                style={{ height: '70vh' }}
            >
                {src.map((el) => {
                    return (
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                backgroundColor: '#222222',
                                width: '100%',
                            }}
                        >
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
                        </div>
                    )
                })}
            </Gallery>

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
