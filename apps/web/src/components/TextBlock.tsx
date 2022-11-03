import React from 'react';

const H1Block = ({ text, annotations }) => {
    return (
        <div className='my-5 text-4xl'>
            {text}
        </div>
    );
}

const H2Block = ({ text, annotations }) => {
    return (
        <div className='my-5 text-3xl'>
            {text}
        </div>
    );
}

const H3Block = ({ text, annotations }) => {
    return (
        <div className='my-5 text-xl'>
            {text}
        </div>
    );
}

const ParagraphBlock = ({ text, annotations, type }) => {
    return (
        <div className='my-2'>
            {text}
        </div>
    );
};

const TextBlock = ({ text, annotations, type }) => {
    console.log(text, type);

    switch (type) {
        case 'paragraph': return <ParagraphBlock text={text} />
        case 'heading_1': return <H1Block text={text} />
        case 'heading_2': return <H2Block text={text} />
        case 'heading_3': return <H3Block text={text} />
    }
};

export default TextBlock;