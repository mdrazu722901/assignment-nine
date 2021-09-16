import React, { useContext } from 'react';
import './Header.css'
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

const Header = () => {
    const [data, setData] = useContext(UserContext);
    return (
        <div>
            <nav className="navbar">
                <ul>
                    <span className="title"> Uber Riders</span>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <Link to="/destination">Destination</Link>
                    </li>
                    <li>
                        <Link to="/block">Block</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                    {
                        data.displayName? <li>{data.displayName}</li>
                        :<li className="login"><Link to="/Login">Login</Link></li>
                    }
                </ul>
            </nav>
        </div>
    );
};

export default Header;