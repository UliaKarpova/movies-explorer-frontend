import React from 'react';
import { useState } from 'react';

import './Register.css';
import SignHeader from '../SignHeader/SignHeader';
import SignForm from '../SignForm/SignForm';
import FormWithValidation from '../FormWithValidation/FormWithValidation';

function Register({ onSubmit }) {
    const { errors, handleChange } = FormWithValidation();

    return (
        <>
            <SignHeader title='Добро пожаловать!' />

            <SignForm onSubmit={onSubmit}
            submitText='Зарегистрироваться'
            redirectText='Уже зарегистрированы? '
            redirectRoute='/signin'
            linkText='Войти'>
                <label htmlFor='name'
                className='form__label'>Имя</label>

                <input type='text'
                id='name'
                name='name'
                minLength='2'
                maxLength='30'
                onChange={handleChange} 
                className={`form__input ${errors.name === undefined ? '' : 
                    errors.name === '' ? 'correct' : 'uncorrect'}`} />

                <span className='form__error'>{errors.name || ''}</span>
            </SignForm>
        </>
    );
}

export default Register;
