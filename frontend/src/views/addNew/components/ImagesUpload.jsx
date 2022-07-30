import React from 'react'
import { observer } from 'mobx-react-lite'
import { Card, CardScroll } from '@vkontakte/vkui'
import { Icon24Dismiss, Icon32CameraOutline } from '@vkontakte/icons'
import ImageUploading from 'react-images-uploading'
import ImageCard from './ImageCard'

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
                        <ImageCard cardType="add" onImageUpload={onImageUpload} />
                        {imageList.map((image, index) => {
                            return (
                                <ImageCard
                                    key={image.file.lastModified}
                                    index={index}
                                    imageData={image.data_url}
                                    onImageUpdate={onImageUpdate}
                                    onImageRemove={onImageRemove}
                                />
                            )
                        })}
                    </CardScroll>
                )
            }}
        </ImageUploading>
    )
})

export default ImagesUpload
