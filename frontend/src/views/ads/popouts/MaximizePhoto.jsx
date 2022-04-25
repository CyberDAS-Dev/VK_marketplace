import { Icon24DismissDark } from '@vkontakte/icons'
import { Gallery, IconButton, PopoutWrapper } from '@vkontakte/vkui'
import React from 'react'

export default function PhotoPopout({ src, index, closePopout }) {
    const imgHeight = '70vh'

    return (
        <PopoutWrapper alignY="center" alignX="center" onClick={closePopout}>
            {src.length > 1 ? (
                <Gallery
                    styleWidth="100%"
                    bullets="light"
                    initialSlideIndex={index}
                    showArrows
                    style={{ height: imgHeight }}
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
                                    height="auto"
                                    style={{
                                        borderRadius: 0,
                                    }}
                                />
                            </div>
                        )
                    })}
                </Gallery>
            ) : (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        backgroundColor: '#222222',
                        height: imgHeight,
                        width: '100%',
                    }}
                >
                    <img
                        key={src}
                        src={src}
                        alt="Фотография товара"
                        width="100%"
                        height="auto"
                        style={{
                            borderRadius: 0,
                        }}
                    />
                </div>
            )}

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
