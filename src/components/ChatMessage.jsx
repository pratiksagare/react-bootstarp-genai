import React from 'react'
import PropTypes from 'prop-types';

export default function ChatMessage({ variant, message }) {
    const customStyle = {
        user: {
            backgroundColor: '#F3F3F3',
            marginLeft: 'auto', // Pushes the user message to the right
            textAlign: 'right', // Aligns the text inside the user message to the right
            color: 'black'
        },
        model: {
            backgroundColor: 'grey',
            marginRight: 'auto', // Pushes the model message to the left
            textAlign: 'left', // Aligns the text inside the model message to the left
            color: 'white'
        },
    };
    return (
        <div
            className='p-2 chat-message mb-2'
            style={{
                width: 'fit-content',  // Adjust width based on content size
                maxWidth: '75%',          // Limit width to 80% of parent container
                borderRadius: '10px', color: `${customStyle[variant].color}`, display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignSelf: variant === 'user' ? 'flex-end' : 'flex-start', ...customStyle[variant]
            }}
        >
            {message}
        </ div>
    );
}

ChatMessage.propTypes = {
    variant: PropTypes.oneOf(['user', 'model']).isRequired,
};