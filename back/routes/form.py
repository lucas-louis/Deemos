from fastapi import APIRouter, UploadFile
from pydantic import BaseModel
from config import STARTON_API_KEY, STARTON_CONTRACT_URI, STARTON_BASE_URL
import aiohttp


class ID_card(BaseModel):
    first_name: str
    last_name: str
    date_of_birth: str
    sex: str
    nationality: str
    place_of_birth: str
    expiration: str

router = APIRouter()

async def generate_token(wallet_adress: str, cid: str):
    async with aiohttp.ClientSession(headers={"x-api-key": STARTON_API_KEY}) as session:
        base_url = STARTON_BASE_URL
        contract_uri = STARTON_CONTRACT_URI
        payload = {"functionName": 'createToken',
            "signerWallet": wallet_adress,
            "speed": "low",
            "params": [
                wallet_adress, # _OWNER address 0x0000000000000000000000000000000000000000
                'DEEMOS_ID', # string 'my _name'
                'certifies your date of birth and nationality', # string 'my _description'
                cid, # string 'my _tokenURI'
                'DEE' # string 'my _symbol'
            ],
        }
        async with session.post(base_url + contract_uri, data=payload) as resp:
            token = await resp.json()
            print('got token: ' + token)
            return token

@router.post("/identity")
async def submit(wallet_adress: str, card: ID_card, file: UploadFile, cid: str):
    return ({"token": generate_token(wallet_adress, cid)})