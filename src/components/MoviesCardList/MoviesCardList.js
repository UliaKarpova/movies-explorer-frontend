import React from 'react';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';

import './MoviesCardList.css';

import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ clickOn, movies, route, children }) {
    const currentUser = React.useContext(CurrentUserContext);
    const owner = currentUser.id;
    console.log(movies);


    const isSavedRoute = route === 'movies' ? false : true; 
    const movieCards = movies.map((movie) => {
        return (
            <li key={movie.id} className='movies__card'>
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