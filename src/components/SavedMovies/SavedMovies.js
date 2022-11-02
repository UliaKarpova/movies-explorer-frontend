import React from 'react';
import { Link  } from 'react-router-dom';

import Header from '../Header/Header';
import BurgerMenu from '../Navigation/BurgerMenu';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';

function SavedMovies({ onClick, isMovieShort, clickOnIcon, movies, findMovies, preloaderStarts, findedSavedMovies, searchError }) {
    const route = 'saved-movies';

    return (
        <div className='movies-page'>
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

            <main className='movies-main'>
                <SearchForm onClick={onClick} 
                findMovies={findMovies}
                isMovieShort={isMovieShort}/>

                <p className='search-error search-error_under-search'>{searchError || ''}</p>

                {!movies && !findedSavedMovies ? '' :
                preloaderStarts ? ( <Preloader /> ) :
                ( <MoviesCardList clickOn={clickOnIcon} 
                    movies={findedSavedMovies.length === 0 ? movies : findedSavedMovies} 
                    route={route} />
                )}
            </main>

            <Footer />
        </div>
    );
}

export default SavedMovies;
