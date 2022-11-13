import React from 'react';

import './MoviesCard.css';

function MoviesCard({ movie, saveMovie, removeSavedMovie, isSavedRoute, isSaved }) {
    const newMovie = {
        country: movie.country,
        director: movie.director, 
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: isSavedRoute ? movie.image : `https://api.nomoreparties.co${movie.image.url}`,
        trailerLink: movie.trailerLink,
        thumbnail: isSavedRoute ? movie.thumbnail : `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
        nameRU: movie.nameRU || '',
        nameEN: movie.nameEN || '',
        }

    const newDuration = getDuration();
    const buttonClass = `card__button ${ !isSavedRoute ? `${isSaved ? 'active' : ''}` : 'card__button_type_saved'} `;

    function getDuration() {
        if (movie.duration >= 40) {
            const hours = Math.floor(movie.duration/60);
            const minutes = movie.duration - (hours * 60);
            const total = hours + ' ч. ' + minutes + ' мин.';
            return total;
        } else {
            return movie.duration + ' мин.';
        }
    }

    function buttonToggle(event) {
        /*isSaved = !isSaved;*/
        event.target.classList.toggle('active');
    }

    function buttonClick() {
        if(isSavedRoute) {
            removeSavedMovie(movie, buttonToggle);
        } else {
            if (isSaved) {
                removeSavedMovie(movie, buttonToggle);
            } else {
                saveMovie(newMovie, buttonToggle);
            }
        }
    }

    return (
        <div className='card'>
            <button className={buttonClass}
            type='button'
            onClick={buttonClick} />

            <a className='card__link' 
            href={movie.trailerLink}  
            rel='noopener noreferrer' 
            target='_blank'>
                <h2 className='card__title'>{isSavedRoute ? movie.nameRU : newMovie.nameRU}</h2>

                <p className='card__duration'>{newDuration}</p>

                <img className='card__img' 
                src={isSavedRoute ? movie.image : newMovie.image} 
                alt='Постер' />
            </a>
        </div>
    );
}

export default MoviesCard;
