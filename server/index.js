const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const { linkRouter, projectRouter, technologyRouter, userRouter } = require('./api');
const { utility } = require('./util');

dotenv.config();
utility.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use('/api/links', linkRouter);
app.use('/api/projects', projectRouter);
app.use('/api/technologies', technologyRouter);
app.use('/api/user', userRouter);
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/public'));
}

app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

const port = process.env.PORT || 5000;
app.listen(port);
