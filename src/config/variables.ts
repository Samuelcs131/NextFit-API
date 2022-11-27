const env = {
  production: {
    port: process.env.PORT,
    database: process.env.DATABASE_URL,
    secret: process.env.SECRET,
    sendGrid: process.env.SENDGRID_API_KEY,
    authorization: process.env.NEXTFIT_API_KEY
  }
}

export default env
