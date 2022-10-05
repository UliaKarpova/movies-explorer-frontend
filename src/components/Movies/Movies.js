import React from 'react';
import { Link  } from 'react-router-dom';
import './Movies.css';
import Header from '../Header/Header';
import BurgerMenu from '../Navigation/BurgerMenu';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies() {
  const route = 'movies';
  const isSavedRoute = false;
  return (
    <>
      <Header>
        <nav className='header__nav'>
          <Link to='/movies' className='header__to-movies'>Фильмы</Link>
          <Link to='/saved-movies' className='header__to-saved-movies'>Сохранённые фильмы</Link>
        </nav>
        <Link to='/profile' className='header__to-profile'>Аккаунт</Link>
        <BurgerMenu route={route} />
      </Header>
      <main>
        <SearchForm />
        <MoviesCardList isSaved={isSavedRoute}>
          <button type='button' className='movies__button'>Ещё</button>
        </MoviesCardList>
      </main>
      <Footer />
    </>
  );
}

export default Movies;
