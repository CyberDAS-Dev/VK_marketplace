import dataURItoBlob from '@/utils/dataURItoBlob'
import http from './http'

const uploadImages = async (images) => {
    const imagesUrls = await Promise.all(
        images.map(async (image) => {
            if (image.data_url.startsWith('http')) return image.data_url

            const formData = new FormData()

            formData.append('file', dataURItoBlob(image.data_url))

            const { data } = await http.post(`/images/`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
            return data
        })
    )

    return imagesUrls
}

export default uploadImages
