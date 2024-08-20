import axios from "axios"
import { config } from "../config"
import { AuthPKI } from "../types/admin.types"

export const displayProjects = async (datas: AuthPKI) => {
    const token = window.localStorage.getItem('hash-token')
    return axios.post(`${config.api_url}/api/v1/project/all`, datas, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

export const getOneProject = async (datas: AuthPKI, id: string) => {
    const token = window.localStorage.getItem('hash-token')
    return axios.post(`${config.api_url}/api/v1/project/one/${id}`, datas, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

export const recupDataAI = async (datas: any) => {
    const token = window.localStorage.getItem('hash-token')
    return axios.post(`${config.api_url}/api/v1/dataset`, datas, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

export const updateOneProject = async (datas: AuthPKI, id: string) => {
    const token = window.localStorage.getItem('hash-token')
    return axios.put(`${config.api_url}/api/v1/project/update/${id}`, datas, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

export const updateProjectStatus = async (datas: AuthPKI, id: string) => {
    const token = window.localStorage.getItem('hash-token')
    return axios.put(`${config.api_url}/api/v1/project/updateStatus/${id}`, datas, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

export const deleteOneProject = async (datas: AuthPKI, id: string) => {
    const token = window.localStorage.getItem('hash-token')
    return axios.post(`${config.api_url}/api/v1/project/delete/${id}`, datas, {headers: {"x-access-token": token}})
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        return err
    })
}