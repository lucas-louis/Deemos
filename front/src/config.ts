import process from 'process';

const config = {
  STARTON_BASE_URL: process.env.STARTON_BASE_URL!,
  STARTON_API_KEY: process.env.STARTON_API_KEY!,
  STARTON_CONTRACT_URI: process.env.STARTON_CONTRACT_URI!,
  PORT: parseInt(process.env.PORT!)
}

export default config;