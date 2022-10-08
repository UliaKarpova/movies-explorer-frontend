import React from 'react';
import { useState } from 'react';

import './SearchForm.css';
function SearchForm({findMovies}) {
    const [value, setValue] = useState('');

    function getValue(event) {
        const data = event.target.value;
        setValue(data);
    };

    function find(event) {
        event.preventDefault();
        findMovies(value);
    };

    return (
        <form className='search-form' onSubmit={find}>
            <input type='search' onChange={getValue} className='search-form__input' placeholder='Фильм' required />
            <button type='submit' className='search-form__button' />
            <label htmlFor='checkbox' className='search-form__checkbox-label'>
                <input type='checkbox' id='checkbox' className='search-form__checkbox' />
                <div className='search-form__checkbox-toggle' />
                <span className='search-form__checkbox-text'>Короткометражки</span>
            </label>
        </form>
    )
}

export default SearchForm;