require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());




app.get('/', (req, res) => {
    res.send('Hello world, from olympihacks');
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});