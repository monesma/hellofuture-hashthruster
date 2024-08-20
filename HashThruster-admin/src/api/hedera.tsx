import axios from "axios"

import { config } from "../config"

export const getTokenById = async (tokenId: string) => {
    return axios.get(`${config.hedera_url}/api/v1/tokens/${tokenId}`)
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

export const getTokenBalance = async (tokenId: string) => {
    return axios.get(`${config.hedera_url}/api/v1/tokens/${tokenId}/balances`)
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

export const getHbarPrice = async (num: number) => {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
        params: {
          ids: 'hedera-hashgraph',
          vs_currencies: 'usd',
        },
      });

      const hbarPrice = response.data['hedera-hashgraph'].usd;
      const result = num * hbarPrice
      return result;
    } catch (err) {
      return null
    }
};

export const getWalletFromProject = async (id: string) => {
  return axios.get(`${config.hedera_url}/api/v1/accounts/${id}`)
  .then((res)=>{
      return res.data
  })
  .catch(err=>err)
}
