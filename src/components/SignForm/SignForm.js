import React from 'react';
import { Link } from 'react-router-dom';
import './SignForm.css';

function SignMain({ children, submitText, redirectText, redirectRoute, linkText }) {

    return (
        <form className='form'>
            {children}
            <label htmlFor='email' className='form__label'>E-mail</label>
            <input type='email' name='email' id='email' defaultValue='user@mail.ru' className='form__input correct' />
            <span className='form__error'>Что-то пошло не так...</span>
            <label htmlFor='password' className='form__label'>Пароль</label>
            <input type='password' name='password' id='password' defaultValue='12345' className='form__input uncorrect' />
            <span className='form__error form__error_visible'>Что-то пошло не так...</span>
            <button type='submit' className='form__submit'>{submitText}</button>
            <p className='form__redirect'>{redirectText} 
                <Link to={redirectRoute} className='form__redirect_green'>{linkText}</Link>
            </p>
        </form>
    )
}

export default SignMain;