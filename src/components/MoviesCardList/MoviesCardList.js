import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ movies, isSaved, children }) {
    const isMovieSaved = isSaved;
    const movieCards = movies.map((movie) => {
        return (
            <li key={movie.id} className='movies__card'>
                <MoviesCard movieDuration={movie.duration}
                movieImage={`https://api.nomoreparties.co${movie.image.url}`} 
                movieTitle={movie.nameRU}
                isSaved={isMovieSaved} />
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