import { environmentVariables } from 'src/types/enums/environmentVariables.enum'
import authorizedCustomers from './authorizedCustomers'

const ENV = {
  production: {
    port: process.env.PORT as string,
    database: process.env.DATABASE_URL as string,
    secret: process.env.SECRET as string,
    sendGrid: process.env.SENDGRID_API_KEY as string,
    authorization: authorizedCustomers
  },
  develop: {
    port: process.env.PORT as string,
    database: process.env.DEV_DATABASE_URL as string,
    secret: process.env.SECRET as string,
    sendGrid: process.env.SENDGRID_API_KEY as string,
    authorization: null
  }
}

function env () {
  switch (Number(process.env.CONFIG)) {
    case environmentVariables.develop:
      return ENV.develop
    case environmentVariables.production:
      return ENV.production
    default:
      return ENV.develop
  }
}

export { env }
