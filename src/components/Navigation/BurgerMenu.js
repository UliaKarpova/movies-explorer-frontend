import React from 'react';
import { Link  } from 'react-router-dom';
import './BurgerMenu.css';

function BurgerMenu({route}) {
  return (
    <>
        <div className='burger'>
          <input type='checkbox' id='check-menu' className='burger__check-menu' />
          <label htmlFor='check-menu' className='burger__label' />
          <div className='burger__menu'>
                <nav className='burger__links-block'>
                    <Link to='/' className='burger__link'>Главная</Link>
                    <Link to='/movies' className={`burger__link ${route === 'movies' ? 'burger__link_active' : ''}`}>Фильмы</Link>
                    <Link to='/saved-movies' className={`burger__link ${route === 'saved-movies' ? 'burger__link_active' : ''}`}>Сохранённые фильмы</Link>
                    <Link to='/profile' className='burger__profile-link'>Аккаунт</Link>
                </nav>
            </div>
        </div>
    </>
  );
}

export default BurgerMenu;
