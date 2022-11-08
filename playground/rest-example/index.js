const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// GET
app.get('/users', (req, res) => {
    const data = fs.readFileSync('./users.json');
    res.send(data);
});

// POST
app.post('/add/user', (req, res) => {
    const newUser = {
        "name": "newguy",
        "password": "password1",
        "profession": "student",
        "id": 4
    };

    const response = fs.readFileSync('./users.json');
    const data = JSON.parse(response);
    const updatedData = {
        ...data,
        user4: newUser
    };

    res.send(updatedData);
})

// PUT 
app.put("/update/:userId", (req, res) => {
    const { params } = req;
    const response = fs.readFileSync('./users.json');
    const data = JSON.parse(response);
    const foundUser = data[params.userId];

    const updatedData = {
        ...data,
        [params.userId]: {
            ...foundUser,
            ...req.body
        }
    };

    res.send(updatedData);

});

// DELETE
app.delete('/delete/:userId', (req, res) => {
    const { params } = req;
    const response = fs.readFileSync('./users.json');
    const data = JSON.parse(response);
    const users = Object.keys(data)
        .filter(id => id !== params.userId)
        .reduce((acc, cur) => {
            return {
                ...acc,
                [cur]: data[cur]
            }
        }, {});


    res.send(users);

});


const server = app.listen(8081, () => {
    const { port } = server.address();

    console.log("Express server started on http://localhost:%s", port);
});