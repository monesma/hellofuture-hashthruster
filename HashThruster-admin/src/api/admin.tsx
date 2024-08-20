import axios from "axios"
import { AuthPKI, LoginAdmin, RegisterAdmin, UpdateAdminStatus, UpdatePassword } from "../types/admin.types"
import { config } from "../config"



export const getAllAdmin = async (datas: AuthPKI) => {
    const token = window.localStorage.getItem('hash-token')
    return axios.post(`${config.api_url}/api/v1/admin/allAdmin`, datas, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        return err
    })
}
export const registerAdmin = async (datas: RegisterAdmin) => {
    const token = window.localStorage.getItem('hash-token')
    return axios.post(`${config.api_url}/api/v1/admin`, datas, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

export const loginAdmin = async (datas: LoginAdmin) => {
    return axios.post(`${config.api_url}/api/v1/admin/login`, datas)
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

export const updateAdminPassword = async (datas: UpdatePassword) => {
    const token = window.localStorage.getItem('hash-token')
    return axios.put(`${config.api_url}/api/v1/admin/updatePassword`, datas, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

export const updateAdminStatus = async (datas: UpdateAdminStatus) => {
    const token = window.localStorage.getItem('hash-token')
    return axios.put(`${config.api_url}/api/v1/admin/updateStatus`, datas, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

export const checkMyToken = () => {
    const token = window.localStorage.getItem('hash-token')
    return axios.get(`${config.api_url}/api/v1/admin/checkToken`, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

export const checkRefreshToken = (datas: AuthPKI) => {
    const myToken = window.localStorage.getItem('hash-token')
    return axios.post(`${config.api_url}/api/v1/admin/checkRefreshTokenAdmin`, datas, {headers: {"x-access-token": myToken}})
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        return err
    })
}