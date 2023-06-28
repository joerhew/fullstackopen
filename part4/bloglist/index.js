const app = require('./app');
const config = require('./utils/config');
const logger = require('./utils/logger');

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})

/* require('dotenv').config();
const express = require('express')
const app = express()
const cors = require('cors')


const mongoUrl = process.env.MONGODB_URI;
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())



const PORT = 3003
 */