import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
    const [fact, setFact] = useState("");

    useEffect(() => {
        axios.get("https://cat-fact-herokuapp.com/facts").then((res) => {
            setFact(res.data[0].text);
        });
    }, []);

    return (
        <div className="App">
            <h1>Cat Facts</h1>
            <p>{fact}</p>
        </div>
    );
}