import http from '@/api/http'
import dataURItoBlob from '@/utils/dataURItoBlob'

const submitAdvert = async (props) => {
    const { images } = props

    // TODO загрузка изображений напрямую в вк
    // загрузка изображений на свой сервер, возвращает ImageUrl[]
    try {
        const imagesUrls = await Promise.all(
            images.map(async (image) => {
                const formData = new FormData()

                formData.append('file', dataURItoBlob(image.data_url))

                const { data } = await http.post(`/images/`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                })

                return data
            })
        )

        http.post('/items/', { ...props, images: imagesUrls })
    } catch {
        throw new Error('Ошибка загрузки изображений')
    }
}

export default submitAdvert
