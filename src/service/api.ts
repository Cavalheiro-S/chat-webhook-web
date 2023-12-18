import axios, { Axios } from "axios";


export const api = axios.create({
    baseURL: 'http://localhost:3001',
    headers:{
        Accept: 'application/json'
    }
})