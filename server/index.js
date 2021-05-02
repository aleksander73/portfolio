const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const { projectRouter, technologyRouter } = require('./api');

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/api/projects', projectRouter);
app.use('/api/technologies', technologyRouter);
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/public'));
}

const port = process.env.PORT || 5000;
app.listen(port);
