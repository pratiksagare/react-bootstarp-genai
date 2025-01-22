import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import GeminiFlash from '../components/GeminiFlash'
import GeminiPro from '../components/GeminiPro'
import Inputs from '../components/Inputs'
import Navbar from '../components/Navbar'
import '../style/customSwitchStyle.css'

export default function AIPage() {
    return (
        // <Container fluid={true} className='d-flex flex-column flex-grow-1' style={{ height: '100%' }}>
        //     <Row>
        //         <Navbar />
        //     </Row>
        //     <Row className="d-flex justify-content-evenly  pt-2 custom-row">
        //         <Col className="custom-col" xs={12} lg={6}>
        //             <GeminiFlash />
        //         </Col>
        //         <Col className="custom-col" xs={12} lg={6}>
        //             <GeminiPro />
        //         </Col>
        //     </Row>
        //     <Row className=''>
        //         <Inputs />
        //     </Row>
        // </Container>
        <Container fluid={false} className='d-flex flex-column vh-100'>
            <Row>
                <Navbar />
            </Row>
            <Row className="d-flex justify-content-evenly flex-grow-1 pt-2 custom-row">
                <Col className="custom-col" xs={12} lg={6}>
                    <GeminiFlash />
                </Col>
                <Col className="custom-col" xs={12} lg={6}>
                    <GeminiPro />
                </Col>
            </Row>
            <Row className=''>
                <Inputs />
            </Row>
        </Container>
    )
}
