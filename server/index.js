const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const projects = require('./router/api/projects');
const technologies = require('./router/api/technologies');

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/api/projects', projects);
app.use('/api/technologies', technologies);
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/public'));
}

const port = process.env.PORT || 5000;
app.listen(port);
