import React from 'react';
import { useState } from 'react';

import SignHeader from '../SignHeader/SignHeader';
import SignForm from '../SignForm/SignForm';

function Login({ onSubmit }) {
  /*const [values, setValues] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
     setValues({...values,
      [name]: value,
    })
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(values);
  }*/


  return (
    <>
      <SignHeader title='Рады видеть!' />
      <SignForm onSubmit={onSubmit} 
        submitText='Войти' 
        redirectText='Ещё не зарегистрированы? ' 
        redirectRoute='/signup' 
        linkText='Регистрация' />
    </>
  );
}

export default Login;
