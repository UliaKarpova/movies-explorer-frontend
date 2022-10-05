import React from 'react';
import { Link  } from 'react-router-dom';
import './Profile.css';
import Header from '../Header/Header';
import BurgerMenu from '../Navigation/BurgerMenu';

function Profile() {
const route = 'profile';
  return (
    <div className='profile__container'>
        <Header>
            <nav className='header__nav'>
            <Link to='/movies' className='header__to-movies'>Фильмы</Link>
            <Link to='/saved-movies' className='header__to-saved-movies'>Сохранённые фильмы</Link>
            </nav>
            <Link to='/profile' className='header__to-profile'>Аккаунт</Link>
            <BurgerMenu route={route} />
        </Header>
        <main className='profile'>
            <form className='profile__form'>
                <h2 className='profile__title'>Привет, Username!</h2>
                <div className='profile__row'>
                    <label htmlFor='name' className='profile__label'>Имя</label>
                    <input type='text' id='name' defaultValue='Username' className='profile__input' />
                </div>
                <hr className='profile__line' />
                <div className='profile__row'>
                    <label htmlFor='email' className='profile__label'>E-mail</label>
                    <input type='email' id='email' defaultValue='User@mail.ru' className='profile__input' />
                </div>
                <div className='profile__buttons'>
                    <button type='submit' className='profile__save'>Редактировать</button>
                    <Link to='/' className='profile__logout'>Выйти из аккаунта</Link>
                </div>
            </form>   
        </main>
        </div>
  );
}

export default Profile;
