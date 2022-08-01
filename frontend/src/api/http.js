import axios from 'axios'

const http = axios.create({
    baseURL: 'http://localhost:8888/v1',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_VK_USER_TOKEN}`,
    },
})

export default http
