import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL : "https://uksocialfinal.herokuapp.com/api"
})