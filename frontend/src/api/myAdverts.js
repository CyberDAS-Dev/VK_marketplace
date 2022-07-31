import http from '@/api/http'

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
    const { data } = await http.put(`/items/${id}`, {
        title: ad.title,
        description: ad.description,
        cost: ad.cost,
        bargain: ad.bargain,
        images: ad.images,
    })
    return data
}
