import http from './http'

const LIMIT = 7

const fetchAdverts = async (skip, filters, limit) => {
    const { category, type, sort, dontShowBargain, cost, onlyPhoto, search } = filters
    const categoryQuery = category === 'all' ? '' : `&category=${category}`
    const [costMin, costMax] = cost
    const typeQuery = type === 'all' ? '' : `&type=${type}`
    const { data } = await http.get(
        `/items/?limit=${limit || LIMIT}&skip=${skip}${categoryQuery}${typeQuery}
&sort=${sort}&show_bargain=${!dontShowBargain}&cost_min=${costMin}&cost_max=${costMax}&with_photo=${onlyPhoto}
&search=${search}`
    )
    return data
}

export default fetchAdverts
