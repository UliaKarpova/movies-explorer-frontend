import React from 'react';

import './MoviesCardList.css';

import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ saveMovie, removeSavedMovie, movies, route, children, savedMovies }) {
    const isSavedRoute = route === 'movies' ? false : true; 
    
    const movieCards = !movies ? '' : movies.map((movie) => {
        let isSaved;
        if (savedMovies) {
            isSaved = savedMovies.some((item) => item.movieId === movie.id);
        }
        return (
            <li key={isSavedRoute ? movie._id : movie.id} 
            className='movies__card'>
                <MoviesCard 
                movie={movie}
                isSaved={isSaved}
                saveMovie={saveMovie}
                removeSavedMovie={removeSavedMovie}
                isSavedRoute={isSavedRoute} />
            </li>
        )
    });

    return (
        <>
            <div className='movies'>
                {movieCards}
            </div>
            
            {children}
        </>
    );
}

export default MoviesCardList;
