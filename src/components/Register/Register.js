import React from 'react';
import { useEffect } from 'react';

import './Register.css';

import SignHeader from '../SignHeader/SignHeader';
import SignForm from '../SignForm/SignForm';
import FormWithValidation from '../FormWithValidation/FormWithValidation';
import Preloader from '../Preloader/Preloader';

function Register({ onSubmit, apiError, resetApiError, preloaderStarts }) {
    const { values, errors, handleChange, isValid, resetForm } = FormWithValidation();

    useEffect(() => {
        resetApiError();
    }, [])

    function onChange(event) {
        resetApiError();
        handleChange(event);
    }

    return (
        <>
            <SignHeader title='Добро пожаловать!' />

            <SignForm onSubmit={onSubmit}
            submitText='Зарегистрироваться'
            redirectText='Уже зарегистрированы? '
            redirectRoute='/signin'
            linkText='Войти'
            values={values}
            apiError={apiError}
            isValid={isValid}
            resetForm={resetForm}>
                <label htmlFor='name'
                className='form__label'>Имя</label>

                <input type='text'
                id='name'
                name='name'
                minLength='2'
                maxLength='30'
                pattern='^[a-zA-ZА-Яа-яёЁ\s\-]{2,30}$'
                onChange={onChange} 
                className={`form__input ${errors.name === undefined ? '' : 
                errors.name === '' ? 'correct' : 'uncorrect'}`} />

                <span className='form__error'>{errors.name ? 'Поле должно содержать от 2 до 30 символов (буквы, пробелы и дефисы)' : ''}</span>

                <label htmlFor='email' 
                className='form__label'>E-mail</label>

                <input type='email' 
                name='email' 
                id='email' 
                onChange={onChange} 
                className={`form__input ${errors.email === undefined ? '' : 
                errors.email === '' ? 'correct' : 'uncorrect'}`}
                required/>

                <span className='form__error'>{errors.email || ''}</span>

                <label htmlFor='password' 
                className='form__label'>Пароль</label>

                <input type='password' 
                name='password' 
                id='password'
                minLength='8'
                onChange={onChange} 
                className={`form__input ${errors.password === undefined ? '' :
                errors.password === '' ? 'correct' : 'uncorrect'}`}
                required />

                <span className='form__error'>{errors.password || ''}</span>

            </SignForm>
            { preloaderStarts ? 
                (<div className='preloader__background'>
                    <Preloader />
                </div>) : ''}
        </>
    );
}

export default Register;
