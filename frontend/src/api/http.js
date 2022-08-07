import axios from 'axios'

const isDev = import.meta.env.MODE === 'development'
const url = isDev ? 'http://localhost:8888/v1' : 'https://'
const token = isDev ? import.meta.env.VITE_VK_USER_TOKEN : window.location.search.slice(1)

const http = axios.create({
    baseURL: url,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    },
})

export default http
