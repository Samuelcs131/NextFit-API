import authorizedCustomers from './authorizedCustomers'

const env = {
  production: {
    port: process.env.PORT as string,
    database: process.env.DATABASE_URL as string,
    secret: process.env.SECRET as string,
    sendGrid: process.env.SENDGRID_API_KEY as string,
    authorization: authorizedCustomers
  }
}

export default env
