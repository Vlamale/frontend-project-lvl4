import axios from 'axios'

const publicHost = axios.create({
    baseURL: '/api/v1',
})

const authHost = axios.create({
    baseURL: '/api/v1',
})

authHost.interceptors.request.use((config) => {
    const token = JSON.parse(localStorage.getItem('user-data')).token
    config.headers.Authorization = `Bearer ${token}`

    return config
})

export {
    publicHost,
    authHost
}