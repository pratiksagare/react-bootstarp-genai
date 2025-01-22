import React, { useContext, useState } from 'react'
import { Card, Form } from 'react-bootstrap'
import ChatMessage from './ChatMessage'
import { AppContext } from '../context/AppContext';
import { v4 as uuidv4 } from 'uuid';

export default function GeminiPro() {
    const { models, geminiPro, setGeminiPro } = useContext(AppContext);

    const handleSwitchToggle = () => {
        setGeminiPro(prevState => !prevState);
    };
    return (
        <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Card.Header className='d-flex justify-content-between'>
                <span>Gemini 1.5 Pro</span>
                <Form.Switch checked={geminiPro} onChange={handleSwitchToggle} className='custom-switch' />
            </Card.Header>
            <Card.Body className='custom-col'>
                {
                    models?.geminiPro && models?.geminiPro?.map((item) => (<ChatMessage variant={item.sender} message={item.message} key={uuidv4()} />)
                    )
                }
            </Card.Body>
        </Card>
    )
}
