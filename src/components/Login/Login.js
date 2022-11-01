import React from 'react';
import { useEffect } from 'react';

import SignHeader from '../SignHeader/SignHeader';
import SignForm from '../SignForm/SignForm';
import FormWithValidation from '../FormWithValidation/FormWithValidation';
import Preloader from '../Preloader/Preloader';


function Login({ onSubmit, apiError, resetApiError, preloaderStarts }) {
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
            <SignHeader title='Рады видеть!' />

           <SignForm onSubmit={onSubmit} 
            submitText='Войти' 
            redirectText='Ещё не зарегистрированы? ' 
            redirectRoute='/signup' 
            linkText='Регистрация'
            values={values}
            apiError={apiError}
            isValid={isValid}
            resetForm={resetForm}>
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
            { preloaderStarts ? (
                <div className='preloader__background'>
                    <Preloader />
                </div>
            ) : ''
            }
        </>
    );
}

export default Login;
