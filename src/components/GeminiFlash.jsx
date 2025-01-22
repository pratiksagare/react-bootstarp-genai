import React, { useContext, useState } from 'react'
import ChatMessage from './ChatMessage'
import { Card, Form } from 'react-bootstrap'
import { AppContext } from '../context/AppContext';
import { v4 as uuidv4 } from 'uuid';


export default function GeminiFlash() {
    const { models, setGeminiFlash, geminiFlash } = useContext(AppContext);

    const handleSwitchToggle = () => {
        setGeminiFlash(prevState => !prevState);
    };
    return (
        <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Card.Header className='d-flex justify-content-between'>
                <span>Gemini 1.5 Flash</span>
                <Form.Switch checked={geminiFlash} onChange={handleSwitchToggle} className='custom-switch' />
            </Card.Header>
            <Card.Body className='custom-col'>
                {
                    models?.geminiFlash && models?.geminiFlash?.map((item) => (<ChatMessage variant={item.sender} message={item.message} key={uuidv4()} />)
                )
                }
            </Card.Body>
        </Card>
    )
}