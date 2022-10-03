import React from 'react';
import { Link  } from 'react-router-dom';
import './Main.css';
import Header from '../Header/Header';
import Promo from './Promo/Promo';
import AboutProject from './AboutProject/AboutProject';
import Techs from './Techs/Techs';
import AboutMe from './AboutMe/AboutMe';
import Portfolio from './Portfolio/Portfolio';
import Footer from '../Footer/Footer';

function Main() {
  return (
    <>
      <Header>
        <nav className='header__signup-signin'>
          <Link to='/signup' className='header__to-signup'>Регистрация</Link>
          <Link to='/signin' className='header__to-signin'>Войти</Link> 
        </nav>
      </Header>  
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
      <Footer />
    </>
  );
}

export default Main;
