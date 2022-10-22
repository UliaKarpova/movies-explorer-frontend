import React from 'react';
import { Link } from 'react-router-dom';
import './SignForm.css';

import FormWithValidation from '../FormWithValidation/FormWithValidation';

function SignMain({ children, onSubmit, submitText, redirectText, redirectRoute, linkText }) {

    const { values, handleChange, errors, isValid, resetForm} = FormWithValidation();

    function handleSubmit(event) {
        event.preventDefault();
        onSubmit(values);
        resetForm();
    }

    return (
        <form className='form' 
        onSubmit={handleSubmit}>
            {children}

            <label htmlFor='email' 
            className='form__label'>E-mail</label>

            <input type='email' 
            name='email' 
            id='email' 
            onChange={handleChange} 
            className={`form__input ${errors.email === undefined ? '' : 
                errors.email === '' ? 'correct' : 'uncorrect'}`}
            required/>

            <span className='form__error'>{errors.email || ''}</span>

            <label htmlFor='password' 
            className='form__label'>Пароль</label>

            <input type='password' 
            name='password' 
            id='password'
            minLength='6'
            onChange={handleChange} 
            className={`form__input ${errors.password === undefined ? '' :
                errors.password === '' ? 'correct' : 'uncorrect'}`}
            required />

            <span className='form__error'>{errors.password || ''}</span>

            <button type='submit' 
            className={`form__submit ${isValid ? '' : 'form__submit_disabled'}`}
            disabled={!isValid}>{submitText}</button>

            <p className='form__redirect'>{redirectText} 
                <Link to={redirectRoute} 
                className='form__redirect_green'>{linkText}</Link>
            </p>
        </form>
    )
}

export default SignMain;