import http from '@/api/http'
import uploadImages from './uploadImages'

const LIMIT = 15

export const myAdverts = async (skip) => {
    const { data } = await http.get(`/users/me/ads?limit=${LIMIT}&skip=${skip}`)
    return data
}

export const getById = async (id) => {
    const { data } = await http.get(`/items/${id}`)
    return data
}

export const submitAdvert = async (id, ad) => {
    const { images } = ad

    try {
        const imagesUrls = await uploadImages(images)

        const { data } = await http.put(`/items/${id}`, {
            title: ad.title,
            description: ad.description,
            cost: ad.cost,
            bargain: ad.bargain,
            images: imagesUrls,
        })
        return data
    } catch {
        throw new Error('Ошибка загрузки изображений')
    }
}

export const deleteAdvert = async (id) => {
    const { data } = await http.delete(`/items/${id}`)
    return data
}
