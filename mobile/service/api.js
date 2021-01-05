import axios from 'axios'

const api = axios.create({
   baseURL: 'http://192.168.0.120:8000',
   timeout: 30 * 1000
})

export default api