import React from 'react';
import { Link  } from 'react-router-dom';

import Header from '../Header/Header';
import BurgerMenu from '../Navigation/BurgerMenu';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';

function SavedMovies({ onClick, isMovieShort, clickOnIcon, movies, findMovies, preloaderStarts }) {
    const route = 'saved-movies';
    console.log(movies);

    return (
        <>
            <Header>
                <nav className='header__nav'>
                    <Link to='/movies' 
                    className='header__to-movies'>Фильмы</Link>

                    <Link to='/saved-movies' 
                    className='header__to-saved-movies'>Сохранённые фильмы</Link>
                </nav>

                <Link to='/profile' 
                className='header__to-profile'>Аккаунт</Link>

                <BurgerMenu route={route} />
            </Header>

            <main>
                <SearchForm onClick={onClick} 
                findMovies={findMovies}
                isMovieShort={isMovieShort}/>

                {preloaderStarts ? ( <Preloader /> ) : 
                (
                    <MoviesCardList clickOn={clickOnIcon} 
                    movies={movies} 
                    route={route} />
                )}
            </main>

            <Footer />
        </>
    );
}

export default SavedMovies;
