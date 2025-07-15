import axios from 'axios'

const clientID = process.env.LINEAR_CLIENT_ID
const clientSecret = process.env.LINEAR_CLIENT_SECRET

export default function handler(req, res) {
    const requestToken = req.query.code;
    const params = new URLSearchParams();
    params.append('client_id', clientID);
    params.append('client_secret', clientSecret);
    params.append('code', requestToken);
    params.append('redirect_uri', 'https://tali.so/api/linear-redirect');
    params.append('grant_type', 'authorization_code');
    axios.post('https://api.linear.app/oauth/token', params)
        .then((response) => {
            const accessToken = response.data.access_token;

            res.redirect(`/?linearAccessToken=${accessToken}`);
        }).catch((err) => {
            res.send(err);
        });
}