interface CatFactData {
    facts: string[];
    color: string;
    link: string;
}

interface CatImageData {
    image: string;
};

const CatFact = ({ facts }: CatFactData) => {
    return (
        <ul>
            {facts.map((fact) => (
                <li>{fact}</li>
            ))}
        </ul>
    );
};

const CatImage = ({ image }: CatImageData) => (
    <img src={image} />
);

export default () => {
    const catFactData: CatFactData = {
        facts: [
            "Cats make about 100 different sounds. Dogs make only about 10.",
            "I don't know anything about cats.",
            "Domestic cats spend about 70 percent of the day sleeping and 15 percent of the day grooming."
        ],
        color: "red",
        link: "https://github.com/"
    };

    const catImageData: CatImageData = {
        image: "https://placekitten.com/200/300"
    }

    return (
        <div>
            <CatImage image={catImageData.image} />
            <CatFact facts={catFactData.facts} color={catFactData.color} link={catFactData.link} />
        </div>
    );
};