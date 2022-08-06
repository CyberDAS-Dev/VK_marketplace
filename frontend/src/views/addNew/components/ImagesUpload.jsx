import React from 'react'
import { observer } from 'mobx-react-lite'
import { CardScroll } from '@vkontakte/vkui'
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
            acceptType={['jpg', 'png']}
        >
            {({ imageList, onImageUpload, onImageUpdate, onImageRemove }) => {
                return (
                    <CardScroll size="s">
                        <ImageCard cardType="add" onImageUpload={onImageUpload} />
                        {imageList.map((image, index) => {
                            return (
                                <ImageCard
                                    key={image?.file?.size ? image.file.size : image.data_url}
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
