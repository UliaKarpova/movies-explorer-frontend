import React from 'react';

import './MoviesCard.css';

function MoviesCard({ movie, clickOn, isSavedRoute }) {
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
        _id: movie._id,
        }

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
        event.target.classList.toggle('active');
    }

    function movieRemove(event) {
        event.currentTarget.closest('.movies__card').remove();
    }

    function buttonClick(event) {
        if(isSavedRoute) {
            movieRemove(event);
        } else {
            buttonToggle(event);
        }
        console.log(newMovie);
        clickOn(newMovie);
    }

    const newDuration = getDuration();
    const buttonClass = `card__button ${ !isSavedRoute ? `${movie.isSaved ? 'active' : ''}` : 'card__button_type_saved'} `;

  return (
    <div className='card'>
        <button className={buttonClass}
        type='button'
        onClick={buttonClick} />

        <a className='card__link' href={movie.trailerLink}  rel='noopener noreferrer' target='_blank'>
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