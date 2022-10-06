import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import moviesList from '../../utils/moviesList';

function MoviesCardList({isSaved, children}) {
    const isMovieSaved = isSaved;
    const movieCards = moviesList.map((movie) => {
        return (
            <li key={movie.movieId} className='movies__card'>
                <MoviesCard movieDuration={movie.duration} movieImage={movie.image} movieTitle={movie.nameRU} isSaved={isMovieSaved} />
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