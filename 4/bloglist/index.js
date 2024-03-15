import app from './app.js' // Import the app module
import logger from './utils/logger.js' // Import the logger module
import config from './utils/config.js' // Import the config module

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})