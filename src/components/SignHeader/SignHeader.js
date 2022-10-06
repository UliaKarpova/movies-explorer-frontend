import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

import './SignHeader.css';

function SignHeader({title}) {
    return (
        <header className='sign__header'>
            <Link to='/'>
                <img src={logo} alt='Логотип' className='sign__logo-link' />
            </Link>
            <h2 className='sign__title'>{title}</h2>
        </header>
    )
}

export default SignHeader;