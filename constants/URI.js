require('dotenv').config()

const CLIENT_DEVELOPMENT_URI = 'http://localhost:3000'
const CLIENT_PRODUCTION_URI = 'https://emaily-client.netlify.app'

const SERVER_DEVELOPMENT_BASE_URI = 'http://localhost:4000'
const SERVER_PRODUCTION_BASE_URI = 'https://emaily-server-project.herokuapp.com'

const CLIENT_URI =
  process.env.NODE_ENV === 'development'
    ? CLIENT_DEVELOPMENT_URI
    : CLIENT_PRODUCTION_URI

const SERVER_URI =
  process.env.NODE_ENV === 'development'
    ? SERVER_DEVELOPMENT_BASE_URI
    : SERVER_PRODUCTION_BASE_URI

module.exports = {
  CLIENT_DEVELOPMENT_URI,
  CLIENT_PRODUCTION_URI,
  CLIENT_URI,
  SERVER_URI
}
