interface AnimalProps {
    type: string;
    name: string;
    age: number;
}

export default function Animal({ type, name, age }: AnimalProps) {
    return (
        <li>
            <strong>{type}</strong> {name} ({age} years old)
        </li>
    );
}