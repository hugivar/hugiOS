import express from 'express'
import axios from 'axios'
import 'dotenv/config'

const clientID = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const app = express()


app.get('/oauth/authorize', (req, res) => {
    axios({
        method: 'post',
        url: `https://todoist.com/oauth/authorize?client_id=${clientID}&scope=data:read,data:delete&state=1223412412`,
        headers: {
            accept: 'application/json'
        }
    }).then(() => {
        res.sendStatus(200)
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

app.get('/oauth/redirect', (req, res) => {
    const requestToken = req.query.code;
    axios({
        method: 'post',
        url: `https://todoist.com/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}&redirect_uri=https://tali.so`
    }).then((response) => {
        const accessToken = response.data.access_token;
        res.send(accessToken)
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

app.listen(3000);
console.log('Express started on port 3000');