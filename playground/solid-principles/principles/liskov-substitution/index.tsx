interface CatFact {
    facts: string[];
    color: string;
}

const CatFactA = ({ facts, color }: CatFact) => {
    return (
        <>
            {facts.map((fact, index) => (
                <p style={{ color }}>
                    Fact {index}: {fact}
                </p>
            ))}
        </>
    );
};

const CatFactB = ({ facts, color }: CatFact) => {
    return (
        <ul style={{ color }}>
            {facts.map((fact) => (
                <li>{fact}</li>
            ))}
        </ul>
    );
};

export default () => {
    const catFactData: CatFact = {
        facts: [
            "Cats make about 100 different sounds. Dogs make only about 10.",
            "I don't know anything about cats.",
            "Domestic cats spend about 70 percent of the day sleeping and 15 percent of the day grooming."
        ],
        color: "red"
    };

    const abTest = Math.floor(Math.random() * 2) + 1;
    return (
        <div>
            <div>Refresh this page to see a different view</div>
            {abTest === 1 ? (
                <CatFactA color={catFactData.color} facts={catFactData.facts} />
            ) : (
                <CatFactB color={catFactData.color} facts={catFactData.facts} />
            )}
        </div>
    );
};