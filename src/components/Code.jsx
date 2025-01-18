import React from "react";
import ReactMarkdown from "react-markdown";


const Code = ({ code }) => {
    return (
        <div className="p-2" style={{ backgroundColor: '#808080' }}>
            <ReactMarkdown>{code}</ReactMarkdown>
        </div>
    );
};

export default Code;
