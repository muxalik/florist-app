import axios from 'axios'

const fetchCsrfToken = () => {
  axios
    .get('/sanctum/csrf-cookie', {
      baseURL: import.meta.env.VITE_BACKEND_URL,
      withCredentials: true,
      headers: {
        Accept: 'application/json',
      },
    })
    .then(() => {
      console.log('Successfully fetched CSRF token')
    })
    .catch((error) => {
      console.error('Error while fetching CSRF token: ', error)
    })
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    common: {
      Accept: 'application/json',
    },
  },
})

export { fetchCsrfToken, api }
