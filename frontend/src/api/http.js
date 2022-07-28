import axios from 'axios'

const http = axios.create({
    baseURL: 'http://b7ce-2a00-1761-8002-3b-19d-a014-acdf-41b7.ngrok.io/v1',
    headers: {
        'Content-Type': 'application/json',
    },
})

export default http
