import axios from 'axios'

const isDev = import.meta.env.MODE === 'development'
const url = 'https://'
const devToken = import.meta.env.VITE_VK_USER_TOKEN

const http = axios.create({
    baseURL: `${isDev ? 'http://localhost:8888/v1' : url}`,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${isDev ? devToken : window.location.search.slice(1)}`,
    },
})

export default http
