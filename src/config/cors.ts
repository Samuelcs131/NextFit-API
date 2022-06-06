import { CorsOptions } from 'cors'

const corsConfig: CorsOptions = {
  origin: ['https://nextfitt.vercel.app'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204
}

export default corsConfig
