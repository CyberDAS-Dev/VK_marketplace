import http from '@/api/http'
import generateFiltersQuery from '@/utils/generateFiltersQuery'

const LIMIT = 7

const fetchAdverts = async (skip, filters) => {
    const query = generateFiltersQuery(filters)
    const { data } = await http.get(`/items/?limit=${LIMIT}&skip=${skip}${query}`)
    return data
}

export default fetchAdverts
