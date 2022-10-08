import React from 'react';
import { useState } from 'react';

import './Register.css';
import SignHeader from '../SignHeader/SignHeader';
import SignForm from '../SignForm/SignForm';

function Register({ onSubmit }) {
  const [values, setValues] = useState({});

  const handleChange = (e) => {
      const { name, value } = e.target;
      setValues({...values,
          [name]: value,
      })
      console.log(values);
  }

  function handleSubmit(e) {
      e.preventDefault();
      onSubmit(values);
    }

  return (
    <>
        <SignHeader title='Добро пожаловать!' />
        <SignForm onSubmit={handleSubmit} onChange={handleChange} submitText='Зарегистрироваться' redirectText='Уже зарегистрированы? ' redirectRoute='/signin' linkText='Войти'>
            <label htmlFor='name' className='form__label'>Имя</label>
            <input type='text' id='name' name='name' onChange={handleChange} defaultValue='Usrename' className='form__input' />
            <span className='form__error'>Что-то пошло не так...</span>
        </SignForm>
    </>
  );
}

export default Register;
