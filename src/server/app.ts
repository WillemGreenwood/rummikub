import { PORT } from './env';
import { indexHTML } from './indexPage';
import { configureWebsocket } from './websocket';

const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
const path = require('path');

app.use(express.static(path.join(__dirname, '../client')))
app.get('/', (req, res) => res.status(200).send(indexHTML))
app.ws('/', configureWebsocket);
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));