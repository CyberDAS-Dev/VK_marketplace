import React from 'react'
import { observer } from 'mobx-react-lite'
import { Card, CardScroll } from '@vkontakte/vkui'
import { Icon24Dismiss, Icon32CameraOutline } from '@vkontakte/icons'
import ImageUploading from 'react-images-uploading'

const ImagesUpload = observer(function ImagesUpload({ images, setImages }) {
    const onChange = (imageList) => {
        setImages(imageList)
    }

    return (
        <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={5}
            dataURLKey="data_url"
            acceptType={['jpg']}
        >
            {({ imageList, onImageUpload, onImageUpdate, onImageRemove }) => {
                return (
                    <CardScroll size="s">
                        <Card onClick={onImageUpload}>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '96px',
                                    color: '#99A2AD',
                                }}
                            >
                                <Icon32CameraOutline />
                            </div>
                        </Card>
                        {imageList.map((image, index) => {
                            return (
                                <Card
                                    onClick={() => onImageUpdate(index)}
                                    style={{ position: 'relative' }}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            height: '96px',
                                            color: '#99A2AD',
                                            backgroundImage: `url(${image.data_url})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            backgroundRepeat: 'no-repeat',
                                        }}
                                    />
                                    <Icon24Dismiss
                                        style={{ position: 'absolute', top: 5, right: 5 }}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            onImageRemove(index)
                                        }}
                                    />
                                </Card>
                            )
                        })}
                    </CardScroll>
                )
            }}
        </ImageUploading>
    )
})

export default ImagesUpload
