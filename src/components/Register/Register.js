import React from 'react';
import './Register.css';
import SignHeader from '../SignHeader/SignHeader';
import SignForm from '../SignForm/SignForm';

function Register() {
  return (
    <>
        <SignHeader title='Добро пожаловать!' />
        <SignForm submitText='Зарегистрироваться' redirectText='Уже зарегистрированы? ' redirectRoute='/signin' linkText='Войти'>
            <label htmlFor='name' className='form__label'>Имя</label>
            <input type='text' id='name' defaultValue='Usrename' className='form__input' />
            <span className='form__error'>Что-то пошло не так...</span>
        </SignForm>
    </>
  );
}

export default Register;
