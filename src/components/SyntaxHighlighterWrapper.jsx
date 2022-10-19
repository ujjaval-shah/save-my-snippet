import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/default-highlight';
import { tomorrowNightBright } from 'react-syntax-highlighter/dist/esm/styles/hljs';


function SyntaxHighlighterWrapper({ lang, code }) {
    return (
        <SyntaxHighlighter
            style={tomorrowNightBright}
            className='myCode'
            language={lang}
            wrapLongLines={true}
        >
            {code}
        </SyntaxHighlighter>
    );
}

export default SyntaxHighlighterWrapper;