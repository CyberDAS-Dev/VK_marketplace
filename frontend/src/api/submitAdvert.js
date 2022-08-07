import http from '@/api/http'
import uploadImages from './uploadImages'

const submitAdvert = async (props) => {
    const { images } = props

    // TODO загрузка изображений напрямую в вк
    // загрузка изображений на свой сервер, возвращает ImageUrl[]
    try {
        const imagesUrls = await uploadImages(images)

        http.post('/items/', { ...props, images: imagesUrls })
    } catch {
        throw new Error('Ошибка загрузки изображений')
    }
}

export default submitAdvert
