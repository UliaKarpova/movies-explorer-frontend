import React from 'react';
import './SearchForm.css';
function SearchForm() {
    return (
        <div className='search-form'>
            <input type='search' className='search-form__input' placeholder='Фильм' />
            <button type='submit' className='search-form__button'/>
            <label htmlFor='checkbox' className='search-form__checkbox-label'>
                <input type='checkbox' id='checkbox' className='search-form__checkbox' />
                <div className='search-form__checkbox-toggle' />
                <span className='search-form__checkbox-text'>Короткометражки</span>
            </label>
        </div>
    )
}

export default SearchForm;