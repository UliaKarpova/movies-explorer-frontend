import React from 'react';
import { useState } from 'react';

import './SearchForm.css';

function SearchForm({ onClick, findMovies, defaultValue, isMovieShort, removeDefaultValue }) {
    const [value, setValue] = useState('');
    console.log(value);
    console.log(defaultValue);

    function getValue(event) {
        if (removeDefaultValue) {
            removeDefaultValue();
        }
        const data = event.target.value;
        setValue(data);
    };

    function find(event) {
        event.preventDefault();
        findMovies(value || defaultValue);
    };

    return (
        <form className='search-form'
        noValidate
        onSubmit={find}>
            <input type='search' 
            onChange={getValue}
            className='search-form__input'
            defaultValue={defaultValue || value}
            placeholder='Фильм'
            required />

            <button type='submit'
            className='search-form__button' />
            
            <label htmlFor='checkbox' 
            className='search-form__checkbox-label'>
                <input type='checkbox' 
                id='checkbox' 
                onChange={onClick}
                checked={isMovieShort}
                className='search-form__checkbox' />

                <div className='search-form__checkbox-toggle' />

                <span className='search-form__checkbox-text'>Короткометражки</span>
            </label>
        </form>
    )
}

export default SearchForm;