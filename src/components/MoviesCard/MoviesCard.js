import React from 'react';
import './MoviesCard.css';

function MoviesCard({ movieDuration, movieImage, movieTitle, isSaved }) {
    const buttonClass = `card__button ${isSaved ? 'card__button_type_saved' : ''}`;

    function buttonToggle(event) {
        event.target.classList.toggle('active');
    }

    function movieRemove(event) {
        event.currentTarget.closest('.card').remove();
    }

    function buttonClick(event) {
        if(isSaved) {
            movieRemove(event);
        } else {
            buttonToggle(event);
        }
    }

  return (
    <>
        <div className='card__info'>
          <h2 className='card__title'>{movieTitle}</h2>
          <p className='card__duration'>{movieDuration}</p>
          <button className={buttonClass} type='button' onClick={buttonClick} />
        </div>
        <img className='card__img' src={movieImage} alt='Постер' />
    </>
  );
}

export default MoviesCard;