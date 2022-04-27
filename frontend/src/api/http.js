import axios from 'axios'

const http = axios.create({
    baseURL: 'http://localhost:8888/v1',
    headers: {
        'Content-Type': 'application/json',
    },
})

export default http
