import axios from 'axios'

const api = axios.create()

const init = async function () {
  try {
    const response = await axios.get('/sanctum/csrf-cookie', {
      baseURL: import.meta.env.VITE_BACKEND_URL,
    })

    api.defaults.baseURL = import.meta.env.VITE_API_URL
    api.defaults.headers.common['X-CSRF-TOKEN'] = response.data.csrf_token
  } catch (error) {
    console.error('Error fetching CSRF token: ', error)
  }
}

init()

api.defaults.baseURL = import.meta.env.VITE_API_URL

export default api
