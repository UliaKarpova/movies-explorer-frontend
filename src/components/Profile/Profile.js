import React, { useEffect } from 'react';
import { Link  } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import './Profile.css';

import Header from '../Header/Header';
import BurgerMenu from '../Navigation/BurgerMenu';
import FormWithValidation from '../FormWithValidation/FormWithValidation';
import Preloader from '../Preloader/Preloader';

function Profile({ logout, resetApiError, apiError, changeUserInfo, preloaderStarts }) {
    const route = 'profile';

    const currentUser = React.useContext(CurrentUserContext);

    const { values, handleChange, errors, isValid, resetForm } = FormWithValidation();

    useEffect(() => {
        resetApiError();
    }, [])
     
    function onSubmit(event) {
        event.preventDefault();
        changeUserInfo(values);
        if (apiError === '') {
            resetForm();
        }
    }

    function onChange(event) {
        resetApiError();
        handleChange(event);
    }

    return (
        <div className='profile__container'>
            <Header>
                <nav className='header__nav'>
                    <Link to='/movies' 
                    className='header__to-movies'>Фильмы</Link>

                    <Link to='/saved-movies' 
                    className='header__to-saved-movies'>Сохранённые фильмы</Link>
                </nav>

                <Link to='/profile' 
                className='header__to-profile'>Аккаунт</Link>

                <BurgerMenu route={route} />
            </Header>
            <main className='profile'>
                <form className='profile__form'
                onSubmit={onSubmit}>
                    <h2 className='profile__title'>Привет, {currentUser.name}!</h2>

                    <div className='profile__row'>
                        <label htmlFor='name' 
                        className='profile__label'>Имя</label>

                        <input type='text'
                        onChange={onChange}
                        minLength='2'
                        maxLength='30'
                        name='name'
                        id='name'
                        pattern='^[a-zA-ZА-Яа-яёЁ\s\-]{2,30}$'
                        placeholder={currentUser.name}
                        value={values.name === undefined ? currentUser.name : values.name} 
                        className='profile__input'
                        required />
                    </div>

                    <span className='profile__error'>
                    {errors.name ? 'Поле должно содержать от 2 до 30 символов (буквы, пробелы и дефисы)' : ''}</span>

                    <hr className='profile__line' />

                    <div className='profile__row'>
                        <label htmlFor='email' 
                        className='profile__label'>E-mail</label>

                        <input type='email'
                        onChange={onChange}
                        name='email'
                        id='email'
                        placeholder={currentUser.email}
                        value={values.email === undefined ? currentUser.email : values.email} 
                        className='profile__input' 
                        required />
                    </div>

                    <span className='profile__error'>{errors.email || ''}</span>

                    <span className='profile__error submit'>{apiError || ''}</span>

                    <div className='profile__buttons'>
                        <button type='submit'
                        className={`profile__save ${!isValid ? '' : 'profile__save_active'}`}
                        disabled={!isValid}>Редактировать</button>

                        <Link to='/' 
                        onClick={logout} 
                        className='profile__logout'>Выйти из аккаунта</Link>
                    </div>
                </form>

                { preloaderStarts ? (
                    <div className='preloader__background'>
                        <Preloader />
                    </div>
                ) : ''
                }
            </main>
        </div>
    );
}

export default Profile;
