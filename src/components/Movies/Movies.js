import React from 'react';
import { Link  } from 'react-router-dom';

import './Movies.css';

import Preloader from '../Preloader/Preloader';
import Header from '../Header/Header';
import BurgerMenu from '../Navigation/BurgerMenu';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies({ searchError, clickOnIcon, onClick, movies, findMovies, defaultValue, isMovieShort, preloaderStarts, moviesAmount, addMoviesAmount }) {

    const route = 'movies';
    /*let newMoviesAmount = moviesAmount;
    let newMovies = movies.slice(0, newMoviesAmount);
    let moviesAmount = 12;
    let addMoviesAmmount = 3;
    let newMovies = moviesForRendering(moviesAmount);


    /*window.addEventListener("resize", function() {
        if (window.matchMedia("(min-width: 900px)").matches) {
            moviesAmount = 12;
            addMoviesAmmount = 3;
            newMovies = moviesForRendering(moviesAmount);
        } else if (window.matchMedia("(min-width: 550px)").matches) {
            moviesAmount = 8;
            addMoviesAmmount = 2;
            newMovies = moviesForRendering(moviesAmount);
        } else {
            moviesAmount = 5;
            addMoviesAmmount = 2;
            newMovies = moviesForRendering(moviesAmount);
        }
    })
    function moviesForRendering() {
        return movies.slice(0, moviesAmount);
    }

    function addMovies () {
        newMoviesAmount += addMoviesAmount;
        console.log(newMoviesAmount, newMovies);
    } */

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
                isMovieShort={isMovieShort} />


                {/*{preloaderStarts ? ( <Preloader /> ) :
                movies.length > 0 ? 
                    (<MoviesCardList clickOn={clickOnIcon} 
                    movies={movies} 
                    route={route}>
                        <button onClick={addMovies} type='button' 
                        className='movies__button'>Ещё</button>
                    </MoviesCardList>) : (<p className='search-error'>{searchError}</p>)
                }
                */}
            </main>
            
            <Footer />
        </div>
    );
}

export default Movies;
