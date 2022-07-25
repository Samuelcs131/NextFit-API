import { CorsOptions } from 'cors'

const corsConfig: CorsOptions = {
  origin: ['https://nextfitt.vercel.app', 'http://localhost:3000'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 200,
  credentials: true
}

export default corsConfig
