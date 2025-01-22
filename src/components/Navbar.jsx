import { Link } from 'react-router-dom';

export default function Navbar() {
    const linkStyle = {
        userSelect: 'none',
        textDecoration: 'none',
        color: 'black'
    }
    return (
        <div className="py-2 border-bottom d-flex justify-content-between align-items-center">
            < Link style={linkStyle} to={"/"}>Gen AI</Link>
            < Link style={linkStyle} to={"/playground"}>PlayGround</Link>
        </div >
    );
}
