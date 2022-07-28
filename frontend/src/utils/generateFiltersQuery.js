const generateFiltersQuery = (filters) => {
    const { category, type, sort, dontShowBargain, cost, onlyPhoto, search } = filters
    const categoryQuery = category === 'all' ? '' : `&category=${category}`
    const [costMin, costMax] = cost
    const typeQuery = type === 'all' ? '' : `&type=${type}`
    const query = `${categoryQuery}${typeQuery}
&sort=${sort}&show_bargain=${!dontShowBargain}&cost_min=${costMin}
&cost_max=${costMax}&with_photo=${onlyPhoto}&search=${search}`

    return query
}

export default generateFiltersQuery
