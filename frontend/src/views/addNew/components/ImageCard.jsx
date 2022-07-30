import React from 'react'
import { observer } from 'mobx-react-lite'
import { Card } from '@vkontakte/vkui'
import { Icon24Dismiss, Icon32CameraOutline } from '@vkontakte/icons'

const ImageCard = observer(function ImageCard({
    cardType,
    onImageUpload,
    onImageUpdate,
    onImageRemove,
    imageData,
    index,
}) {
    return (
        <Card
            onClick={() => {
                if (cardType === 'add') {
                    onImageUpload()
                } else {
                    onImageUpdate(index)
                }
            }}
            style={{ position: 'relative' }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '96px',
                    color: '#99A2AD',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundImage: cardType !== 'add' ? `url(${imageData})` : '',
                }}
            />
            {cardType === 'add' ? (
                <Icon32CameraOutline
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        margin: 'auto',
                        color: '#99A2AD',
                    }}
                />
            ) : (
                <Icon24Dismiss
                    style={{ position: 'absolute', top: 5, right: 5 }}
                    onClick={(e) => {
                        e.stopPropagation()
                        onImageRemove(index)
                    }}
                />
            )}
        </Card>
    )
})

export default ImageCard
