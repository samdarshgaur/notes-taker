import React from 'react';
import { NavLink } from 'react-router-dom';
import "./Navbar.css";

const Navbar = () => {
    return (
        <div className='navbar'>
            <ul className='navlinks'>
                <NavLink to="/"><li id='home'>Home</li></NavLink>
                <NavLink to="/create-note"><li id='take-notes'>Take Notes</li></NavLink>
                <NavLink to="/notes"><li id='saved-notes'>Saved Notes</li></NavLink>
            </ul>
        </div>
    )
}

export default Navbar;