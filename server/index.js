const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const projects = require('./router/api/projects');

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/api/projects', projects);

const port = 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
