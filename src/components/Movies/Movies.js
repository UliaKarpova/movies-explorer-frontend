import React from 'react';
import { Link  } from 'react-router-dom';
import { useEffect, useState } from 'react';

import './Movies.css';

import Preloader from '../Preloader/Preloader';
import Header from '../Header/Header';
import BurgerMenu from '../Navigation/BurgerMenu';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies({ searchError, clickOnIcon, onClick, movies, findMovies, defaultValue, 
    isMovieShort, preloaderStarts, removeDefaultValue, moviesAmount, addMoviesAmount }) {

    const [newMovies, setNewMovies] = useState([]);
    const [newMoviesAmount, setNewMoviesAmount] = useState(moviesAmount);
    
    const route = 'movies';

    useEffect(() => {
        if (movies) {
        setNewMovies(movies.slice(0, newMoviesAmount));
        }
    }, [movies, newMoviesAmount])

    function addMovies() {
        setNewMoviesAmount(newMoviesAmount + addMoviesAmount);
        setNewMovies(movies.slice(0, newMoviesAmount));
    }

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
                defaultValue={defaultValue} 
                isMovieShort={isMovieShort}
                removeDefaultValue={removeDefaultValue} />

                {!movies ? '' :
                    preloaderStarts ? ( <Preloader /> ) :
                    movies.length > 0 ? 
                    (<MoviesCardList clickOn={clickOnIcon} 
                    movies={newMovies} 
                    route={route}>
                        {movies.length <= newMoviesAmount ? '' :
                        <button onClick={addMovies} 
                        type='button' 
                        className='movies__button'>Ещё</button>}
                    </MoviesCardList>) : (<p className='search-error'>{searchError}</p>)}
            </main>
            
            <Footer />
        </div>
    );
}

export default Movies;
