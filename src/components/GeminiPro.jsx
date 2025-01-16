import React, { useContext } from 'react'
import { Card } from 'react-bootstrap'
import ChatMessage from './ChatMessage'
import { AppContext } from '../context/AppContext';
import { v4 as uuidv4 } from 'uuid';

export default function GeminiPro() {
    const { models } = useContext(AppContext);
    return (
        <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Card.Header>Gemini 1.5 Pro</Card.Header>
            <Card.Body className='custom-col'>
                {
                    models?.geminiPro && models?.geminiPro?.map((item, index) => (<ChatMessage variant={item.sender} message={item.message} key={uuidv4()} />)
                    )
                }
            </Card.Body>
        </Card>
    )
}
