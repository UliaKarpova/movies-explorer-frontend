import './header.css';
import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../images/logo.svg';

function Header() {
    return (
        <header className="header">
             <Link to='/' className='header__logo-link'>{logo}</Link>
             <div className='header__signup-signin'>
                <Link to='/signup' className='header__to-signup'>Регистрация</Link>
                <Link to='/signin' className='header__to-signin'>Войти</Link> 
             </div>           
        </header>
    )
}

export default Header;