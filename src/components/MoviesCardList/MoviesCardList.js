import React from 'react';
import './MoviesCardList.css';

import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ clickOn, movies, route, children }) {
    const isSavedRoute = route === 'movies' ? false : true; 
    const movieCards = !movies ? '' : movies.map((movie) => {
        return (
            <li key={isSavedRoute ? movie._id : movie.id} className='movies__card'>
                <MoviesCard 
                movie={movie}
                clickOn={clickOn}
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