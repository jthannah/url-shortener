import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://jsonbase.com/jhUrlShortener',
})

// Will run for every Axios request made using this instance
instance.interceptors.request.use((config) => {
  // will need to move out of here if use any other api that does not only take json as a payload
  config.headers['content-type'] = 'application/json'
  config.headers['Access-Control-Allow-Origin'] = '*'
  return config
})

// Will run for every Axios response from this instance
instance.interceptors.response.use(
  (response) => response,
  (err) => {
    // Request timed out or error occurred
    return Promise.reject(new Error(err))
  }
)

export default instance
