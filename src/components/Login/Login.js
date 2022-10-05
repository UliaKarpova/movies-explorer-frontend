import React from 'react';
import SignHeader from '../SignHeader/SignHeader';
import SignForm from '../SignForm/SignForm';

function Login() {
  return (
    <>
        <SignHeader title='Рады видеть!' />
        <SignForm submitText='Войти' redirectText='Ещё не зарегистрированы? ' redirectRoute='/signup' linkText='Регистрация' />
    </>
  );
}

export default Login;
