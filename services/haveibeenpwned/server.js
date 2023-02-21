import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';

const app = express()

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(bodyParser.json());


app.options('*', cors(corsOptions))

app.get('/health-check', (req, res) => {
    res.sendStatus(200)
});

app.head("/breaches", cors(corsOptions), (req, res) => {
    res.sendStatus(204);
});
app.options("/breaches", cors(corsOptions));
app.get('/breaches', cors(corsOptions), async (req, res) => {
    const response = await fetch(`https://haveibeenpwned.com/api/v3/breachedaccount/${req.query.email}?truncateResponse=false`, {
        method: 'get',
        body: JSON.stringify(),
        headers: { 'Content-Type': 'application/json', 'hibp-api-key': process.env.API_KEY }
    });

    if (response.status === 404) {
        return res.sendStatus(404)
    }
    if (response.status === 429) {
        return res.end("Rate limited")
    }

    const data = await response.json();
    res.end(JSON.stringify(data));
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));