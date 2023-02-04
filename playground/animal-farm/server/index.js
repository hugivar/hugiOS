import express from 'express';
import cors from 'cors';
import Chance from 'chance';

const chance = new Chance();
const animals = [...Array(250).keys()].map((id) => ({
    id,
    type: chance.animal(),
    age: chance.age(),
    name: chance.name()
}));

const app = express();
app.use(cors());

app.get('/animals', (req, res) => {
    const query = req.query?.animal?.toLowerCase() || '';
    console.log('index line:18', query);
    const filteredAnimals = animals.filter(animal => animal.type.toLowerCase().includes(query));

    res.send(filteredAnimals);
});

app.listen(8080);