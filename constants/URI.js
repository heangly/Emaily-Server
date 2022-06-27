require('dotenv').config()

const CLIENT_DEVELOPMENT_URI = 'http://localhost:3000'
const CLIENT_PRODUCTION_URI = 'https://emaily-client.netlify.app'

const CLIENT_URI =
  process.env.NODE_ENV === 'development'
    ? CLIENT_DEVELOPMENT_URI
    : CLIENT_PRODUCTION_URI

module.exports = { CLIENT_DEVELOPMENT_URI, CLIENT_PRODUCTION_URI, CLIENT_URI }
