import { CorsOptions } from 'cors'

const corsConfig: CorsOptions = {
  origin: ['https://nextfit-api.herokuapp.com'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204
}

export default corsConfig
