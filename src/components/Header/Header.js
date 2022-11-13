import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

import logo from '../../images/logo.svg';

function Header({ children }) {
    return (
        <header className='header'>
            <Link to='/'>
                <img src={logo} alt='Логотип' className='header__logo-link' />
            </Link>

            {children}
        </header>
    )
}

export default Header;
