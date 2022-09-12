import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios'

export const API_URL = `http://localhost:5000/api`

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
})

$api.interceptors.request.use((config: AxiosRequestConfig) => {
  ;(
    config.headers as AxiosRequestHeaders
  ).Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})

export default $api
