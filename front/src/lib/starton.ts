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

const deemos = {
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
      expiration,
    ])
    return res.data;
  },

  balanceOf: async (address: string): Promise<number> => {
    const res: AxiosResponse = await req('balanceOf', [
      address
    ])
    return res.data;
  },

  ownerOf: async (id: number): Promise<string> => {
    const res: AxiosResponse = await req('ownerOf', [
      id
    ])
    return res.data;
  },

  isValid: async (id: number): Promise<boolean> => {
    const res: AxiosResponse = await req('isvalid', [
      id
    ])
    return res.data == true;
  },

  hasValid: async (address: string, id: number): Promise<boolean> => {
    const res: AxiosResponse = await req('hasValid', [
      address,
      id
    ])
    return res.data == true;
  },

  getTokenInfo: async (id: number): Promise<Token> => {
    const res: AxiosResponse = await req('getTokenInfo', [
      id
    ])
    return res.data as Token
  },

  getAllTokens: async (address: string): Promise<number[]> => {
    const res: AxiosResponse = await req('getAllToken', [
      address
    ])
    return res.data as number[]
  },

  unvalidToken: async (id: number): Promise<boolean> => {
    const res: AxiosResponse = await req('unvalidToken', [
      id
    ])
    return res.data as boolean
  }
}

export default deemos;
