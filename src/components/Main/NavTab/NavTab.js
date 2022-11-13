import React from 'react';

import './NavTab.css';

function NavTab () {
    return (
        <nav className='menu'>
            <a href='#about-project' 
            className='menu__link'>О проекте</a>

            <a href='#techs' 
            className='menu__link'>Технологии</a>

            <a href='#about-me' 
            className='menu__link'>Студент</a>
        </nav>
    )
}

export default NavTab; 
