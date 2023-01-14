import { useEffect, useState } from "react";
import axios from 'axios';

const requestAxios = (path): Promise<string> => {
    return axios.get(path).then(res => res.data);
};

const requestFetch = (path): Promise<any> => {
    return fetch(path).then(res => res.json());
};

const RequestFactory = (url: string) => {
    const enableFakeData =
        new URL(window.location.href).searchParams.get("enableFakeData") === "1";

    return enableFakeData ? requestFetch(url) : requestAxios(url);
};

const RequestStarWarsService = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        RequestFactory("https://swapi.dev/api/people/1/")
            .then((res: StarWarsResponse) => resolve(res.name))
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
};

type StarWarsResponse = {
    name: string;
    skin_color: string;
    gender: string;
    hair_color: string;
};

export default function App() {
    const [fact, setFact] = useState("");

    useEffect(() => {
        RequestStarWarsService().then((res) => {
            setFact(res);
        });
    }, []);

    return (
        <div className="App">
            <h1>Star Wars Character</h1>
            <p>{fact}</p>
        </div>
    );
}