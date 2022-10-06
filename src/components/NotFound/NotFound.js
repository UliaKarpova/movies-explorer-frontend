import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <div className='not-found'>
        <h2 className='not-found__code'>404</h2>
        <p className='not-found__text'>Страница не найдена</p>
        <Link to='/' className='not-found__link'>Назад</Link>
    </div>
  );
}

export default NotFound;
