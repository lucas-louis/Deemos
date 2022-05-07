import { Token } from '../types/types';
import axios, { AxiosResponse } from 'axios';
import config from '../config';

const customAxios = axios.create({
  headers: {
    'x-api-key': config.STARTON_API_KEY,
  },
  baseURL: config.STARTON_BASE_URL
})

const req = (func: string, param: any[]) => customAxios.post(config.STARTON_CONTRACT_URI, {
  functionName: func,
  speed: 'low',
  params: [...param]
})

const uriToCid = (uri: string): string => {
  const splittedUri = uri.split('/')
  return splittedUri[splittedUri.length - 1]
}

const pinCid = async (cid: string): Promise<boolean> => {
  const res: AxiosResponse = await customAxios.post('/pinning/pins', {
    cid,
    name: cid
  })
  return res.status === 202
}

const starton = {
  createToken: async (address: string, tokenUri: string, expiration: string): Promise<number> => {
    const name: string = 'DEEMOS_ID'
    const description: string = 'certifies your date of birth and nationality'
    const symbol: string = 'DEE'

    const res: AxiosResponse = await req('createToken', [
      address,
      name,
      description,
      tokenUri,
      symbol,
      Date.parse(expiration)
    ])
    pinCid(uriToCid(tokenUri));
    return res.data.response;
  },

  balanceOf: async (address: string): Promise<number> => {
    const res: AxiosResponse = await req('balanceOf', [
      address
    ])
    return parseInt(res.data.response);
  },

  ownerOf: async (id: number): Promise<string> => {
    const res: AxiosResponse = await req('ownerOf', [
      id
    ])
    return res.data.response;
  },

  isValid: async (id: number): Promise<boolean> => {
    const res: AxiosResponse = await req('isvalid', [
      id
    ])
    return res.data.response == true;
  },

  hasValid: async (address: string, id: number): Promise<boolean> => {
    const res: AxiosResponse = await req('hasValid', [
      address,
      id
    ])
    return res.data.response == true;
  },

  getTokenInfo: async (id: number): Promise<Token> => {
    const res: AxiosResponse = await req('getTokenInfo', [
      id
    ])
    return res.data.response as Token
  },

  getAllTokens: async (address: string): Promise<number[]> => {
    const res: AxiosResponse = await req('getAllToken', [
      address
    ])
    return res.data.response.map((it: string) => parseInt(it))
  },

  unvalidToken: async (id: number): Promise<boolean> => {
    const res: AxiosResponse = await req('unvalidToken', [
      id
    ])
    return res.data.response as boolean
  }
}

export default starton;
