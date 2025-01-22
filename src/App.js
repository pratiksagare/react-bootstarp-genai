import './App.css';
import { Col, Container, Row } from 'react-bootstrap';
import Navbar from './components/Navbar';
import Inputs from './components/Inputs';
import { AppProvider } from './context/AppContext';
import GeminiPro from './components/GeminiPro';
import GeminiFlash from './components/GeminiFlash';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AIPage from './pages/AIPage';
import PlayGround from './pages/PlayGround';

function App() {

  return (
    <AppProvider>
      <Router>
        <Container fluid={false} className='d-flex flex-column vh-100'>
          {/* <Row>
            <Navbar />
          </Row> */}
          <Routes>
            <Route exact path="/" element={<AIPage />} />
            <Route path="/playground" element={<PlayGround />} />
            <Route path="*" element={<div>404 - Page not found</div>} />
          </Routes>
        </Container>
      </Router>
    </AppProvider>
  );
}

export default App;




// import './App.css';
// import { Col, Container, Row } from 'react-bootstrap';
// import Navbar from './components/Navbar';
// import Inputs from './components/Inputs';
// import { AppProvider } from './context/AppContext';
// import GeminiPro from './components/GeminiPro';
// import GeminiFlash from './components/GeminiFlash';

// function App() {

//   return (
//     <AppProvider>
//       <Container fluid={false} className='d-flex flex-column vh-100'>
//         <Row>
//           <Navbar />
//         </Row>
//         <Row className="d-flex justify-content-evenly flex-grow-1 pt-2 custom-row">
//           {/* <Col className="custom-col" style={{ backgroundColor: 'red' }} xs={12} lg={6}>
//           <ChatMessage variant="user" />
//           <ChatMessage variant="model" />
//           <ChatMessage variant="user" />
//           <ChatMessage variant="model" />
//           <ChatMessage variant="user" />
//           <ChatMessage variant="model" />
//           <ChatMessage variant="user" />
//           <ChatMessage variant="model" />
//           <ChatMessage variant="user" />
//           <ChatMessage variant="user" />
//           <ChatMessage variant="model" />
//           <ChatMessage variant="user" />
//           <ChatMessage variant="model" />
//           <ChatMessage variant="user" />
//           <ChatMessage variant="model" />
//           <ChatMessage variant="user" />
//           <ChatMessage variant="model" />
//           <ChatMessage variant="user" />
//         </Col> */}
//           {/* <Col className="custom-col" style={{ backgroundColor: 'green' }} xs={12} lg={6}>
//         </Col> */}
//           <Col className="custom-col" xs={12} lg={6}>
//             <GeminiFlash />
//           </Col>
//           <Col className="custom-col" xs={12} lg={6}>
//             <GeminiPro />
//           </Col>

//         </Row>
//         <Row className=''>
//           <Inputs />
//         </Row>
//       </Container>
//     </AppProvider>
//   );
// }

// export default App;
