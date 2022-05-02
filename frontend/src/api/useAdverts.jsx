import React from 'react'
import { useInfiniteQuery } from 'react-query'
import http from './http'

export default function useAdverts() {
    const [skip, setSkip] = React.useState(0)
    const limit = 5

    const query = useInfiniteQuery(
        'adverts',
        async ({ pageParam = 0 }) => {
            const { data } = await http.get(`/items/?limit=${limit}&skip=${pageParam}`)
            return data
        },
        {
            // костыль для проверки наличия новых объвлений, в худшем случае произойдет еще 1 лишний реквест
            getNextPageParam: (lastPage) => lastPage.length === limit,
        }
    )

    const fetchNextAdverts = () => {
        if (query.hasNextPage) {
            // TODO если все подвязывать на стейт скипа, то почему-то стейт не успевает обновиться
            // и передаться в некст функцию, поэтому в fetchNextPage передается skip + 5
            query.fetchNextPage({ pageParam: skip + limit })
            setSkip(skip + limit)
        }
    }

    return { ...query, fetchNextAdverts }
}
