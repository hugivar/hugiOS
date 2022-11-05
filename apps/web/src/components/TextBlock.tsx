import React from 'react';

interface TextBlock {
    text: string;
    annotations?: any;
    type?: string
};

const H1Block = ({ text, annotations }: TextBlock) => {
    return (
        <div className='my-5 text-4xl'>
            {text}
        </div>
    );
}

const H2Block = ({ text, annotations }: TextBlock) => {
    return (
        <div className='my-5 text-3xl'>
            {text}
        </div>
    );
}

const H3Block = ({ text, annotations }: TextBlock) => {
    return (
        <div className='my-5 text-xl'>
            {text}
        </div>
    );
}

const ParagraphBlock = ({ text, annotations, type }: TextBlock) => {
    return (
        <div className='my-2'>
            {text}
        </div>
    );
};

const NumberedList = ({ text }: TextBlock) => {
    return (
        <li className="list-decimal">
            {text}
        </li>
    );
}


const TextBlock = ({ text, annotations, type }: TextBlock): JSX.Element => {
    switch (type) {
        case 'paragraph': return <ParagraphBlock text={text} />
        case 'heading_1': return <H1Block text={text} />
        case 'heading_2': return <H2Block text={text} />
        case 'heading_3': return <H3Block text={text} />
        case 'numbered_list_item': return <NumberedList text={text} />
    }

    return <React.Fragment />
};

export default TextBlock;