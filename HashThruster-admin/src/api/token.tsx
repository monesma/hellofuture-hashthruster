import axios from "axios"
import { config } from "../config"
import { AuthPKI } from "../types/admin.types"
import { SubmitData } from "../types/token.types"

export const displayTokens = async () => {
    const token = window.localStorage.getItem('hash-token')
    return axios.get(`${config.api_url}/api/v1/token/all`, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

export const getOneToken = async (id: string) => {
    const token = window.localStorage.getItem('hash-token')
    return axios.get(`${config.api_url}/api/v1/token/one/${id}`, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

export const getOneWalletFromToken = async (datas: AuthPKI, id: string) => {
    const token = window.localStorage.getItem('hash-token')
    return axios.post(`${config.api_url}/api/v1/token/wallet/${id}`, datas, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

export const addOneToken = async (datas: SubmitData) => {
    const token = window.localStorage.getItem('hash-token')
    return axios.post(`${config.api_url}/api/v1/token`, datas, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

export const updateOneToken = async (datas: SubmitData, id: string) => {
    const token = window.localStorage.getItem('hash-token')
    return axios.put(`${config.api_url}/api/v1/token/update/${id}`, datas, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

export const deleteOneToken = async (datas: AuthPKI, id: string) => {
    const token = window.localStorage.getItem('hash-token')
    return axios.post(`${config.api_url}/api/v1/token/delete/${id}`, datas, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

export const deleteWalletFromToken = async (datas: AuthPKI, id: string) => {
    const token = window.localStorage.getItem('hash-token')
    return axios.post(`${config.api_url}/api/v1/token/wallet/delete/${id}`, datas, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        return err
    })
}