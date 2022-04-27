import { useQuery } from 'react-query'
import http from './http'

export default function useAdverts() {
    return useQuery('adverts', async () => {
        const { data } = await http.get('/items/')
        return data
    })
}
