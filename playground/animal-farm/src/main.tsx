import React from 'react';
import ReactDOM from 'react-dom/client';
import Animal from './animal';
const useAnimalSearch = () => {
    const [animals, setAnimals] = React.useState([]);

    const search = async (query: string) => {
        console.log(query);
        const response = await fetch(
            'http://localhost:8080/animals?' + new URLSearchParams({ animal: query })
        );
        console.log(response);
        const data = await response.json();

        setAnimals(data);
    };


    return { search, animals };
};

interface IAnimal {
    type: string;
    name: string;
    age: number;
}

const App = () => {
    const { search, animals } = useAnimalSearch();

    return (
        <main>
            <h1>Animal Farm</h1>
            <input
                type="text"
                placeholder='Search'
                onChange={(e) => search(e.target.value)}
            />
            {animals.map((animal: IAnimal) => (
                <Animal
                    {...animal}
                />
            ))}
        </main>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);