import axios from "axios"

const urlapi = 'https://testnet.mirrornode.hedera.com'
const mainnetUrl = 'https://mainnet.mirrornode.hedera.com'

export const getTokenById = async (tokenId: string) => {
    return axios.get(`${urlapi}/api/v1/tokens/${tokenId}`)
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

export const getWalletFromProject = async (id: string) => {
    return axios.get(`${urlapi}/api/v1/accounts/${id}`)
    .then((res)=>{
        return res.data
    })
    .catch(err=>err)
}

export const getTokenBalance = async (tokenId: string) => {
    return axios.get(`${urlapi}/api/v1/tokens/${tokenId}/balances`)
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

export const getOneFungibleTokenById = async (tokenId: string) => {
    return axios.get(`${mainnetUrl}/api/v1/tokens/${tokenId}`)
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        return err
    })
}

const getTrendingPools = async () => {
    try {
        const response = await axios.get('https://api.geckoterminal.com/api/v2/networks/hedera-hashgraph/trending_pools?page=10');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching trending pools:', error);
        return [];
    }
};

const processTokens = async (pools: any) => {
    const myTokens: any[] = [];
    const tokenPromises = pools.map(async (pool: any) => {
        const hexPart = pool.relationships.base_token.data.id.split('_')[1];
        const initialId = parseInt(hexPart, 16);
        const hexChart = pool.id.split('_')[1];
        try {
            const res = await getOneFungibleTokenById(initialId.toString());
            const infos = {
                id: res.token_id,
                idChart: hexChart,
                name: res.name,
                symbol: res.symbol,
                volume24: pool.attributes.volume_usd.h24,
                poolName: pool.attributes.name,
                price: pool.attributes.base_token_price_usd
            };

            myTokens.push(infos);
        } catch (error) {
            console.error(`Failed to process token with initialId ${initialId}:`, error);
        }
    });
    await Promise.all(tokenPromises);

    return myTokens;
};

export const getMostDemandedTokens = async () => {
    const pools = await getTrendingPools();
    const tokens = await processTokens(pools);
    return tokens;
};


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