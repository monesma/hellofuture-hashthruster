import axios from "axios"
const api_url = import.meta.env.VITE_HASHBACK;

export const submitProject = async (datas: any) =>{
    return axios.post(`${api_url}/api/v1/project`, datas)
    .then((res)=>{
        return res.data
    })
    .catch((err) => {
        return err
    })
}

export const displayTokens = async () => {
    return axios.get(`${api_url}/api/v1/token/all`)
    .then((res)=>{
        return res.data
    })
    .catch((err) => {
        return err
    })
}

export const getOneToken = async (id: string) => {
    return axios.get(`${api_url}/api/v1/token/one/${id}`)
    .then((res)=>{
        return res.data
    })
    .catch((err) => {
        return err
    })
}