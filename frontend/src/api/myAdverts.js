import http from '@/api/http'

const LIMIT = 15

const myAdverts = async (skip, limit) => {
    const { data } = await http.get(`/users/me/ads?limit=${limit || LIMIT}&skip=${skip}`)
    return data
}

export default myAdverts
