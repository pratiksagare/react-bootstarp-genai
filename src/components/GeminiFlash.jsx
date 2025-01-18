import React, { useContext } from 'react'
import ChatMessage from './ChatMessage'
import { Card } from 'react-bootstrap'
import { AppContext } from '../context/AppContext';
import Code from './Code';

export default function GeminiFlash() {
    const { models } = useContext(AppContext);
    return (
        <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Card.Header>Gemini 1.5 Flash</Card.Header>
            <Card.Body className='custom-col'>
                {
                    models?.geminiFlash && models?.geminiFlash?.map((item, index) => {
                        if (item.sender === "user" || item.sender === "model")
                            return <ChatMessage variant={item.sender} message={item.message} key={index} />
                        if (item.sender === "model")
                            return <Code code={item.message} />
                    }
                    )
                }

            </Card.Body>
        </Card>
    )
}