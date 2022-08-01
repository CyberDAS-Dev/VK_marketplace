import axios from 'axios'

const isDev = import.meta.env.MODE === 'development'
const url = 'https://'

const http = axios.create({
    baseURL: `${isDev ? 'https://localhost:8888/v1' : url}`,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
            isDev ? import.meta.env.VITE_VK_USER_TOKEN : window.location.search.slice(1)
        }`,
    },
})

export default http
