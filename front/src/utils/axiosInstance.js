import axios from 'axios'
import env from './envInstance'
import protocol from './protocolInstance'

const baseURL = `${protocol}://${env.API_URL}/api`
const api = axios.create({
	baseURL,
	withCredentials: true,
})
console.log(baseURL)
export default api
