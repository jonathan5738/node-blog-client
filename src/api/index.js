import axios from 'axios' 

const API = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL
})
API.interceptors.request.use(request => {
    if(localStorage.getItem(process.env.REACT_APP_USER_PROFILE)){
        const token = JSON.parse(localStorage.getItem(process.env.REACT_APP_USER_PROFILE)).token
        request.headers.Authorization = `Bearer ${token}`
    }
    return request
})

export default API