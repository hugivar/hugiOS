import React from 'react';
import ReactDOM from 'react-dom/client';

//mock datastore
const store = new Map();

const usePosition = (initialValue = 1) => {
    const [position, setPosition] = React.useState(initialValue);

    const updatePosition = () => {
        setPosition(Math.ceil(Math.random() * 100 % 9))
    };

    return [position, updatePosition];
};
const App = () => {
    const [position, updatePosition] = usePosition();
    const [selectedPerson, setSelectedPerson] = React.useState(null);

    React.useEffect(() => {
        const getPerson = async (position) => {
            if (store.has(position)) {
                setSelectedPerson(store.get(position));
            }

            const response = await fetch(`https://swapi.dev/api/people/${position}`);
            const person = await response.json();

            store.set(position, person);
            setSelectedPerson(person);
        };

        getPerson(position);
    }, [position, setSelectedPerson]);

    const handleClick = () => {
        // get random number for 1 to 9
        updatePosition();
    };

    return (
        <>
            <div>hello, {selectedPerson?.name}</div>
            <div>positin: {position}</div>
            <button onClick={handleClick}>new star wars</button>
        </>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);