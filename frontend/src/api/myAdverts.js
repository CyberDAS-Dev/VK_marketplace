import http from '@/api/http'

const LIMIT = 15

const myAdverts = async (skip) => {
    const { data } = await http.get(`/users/me/ads?limit=${LIMIT}&skip=${skip}`)
    return data
}

export default myAdverts
