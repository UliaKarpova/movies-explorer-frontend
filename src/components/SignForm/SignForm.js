import React from 'react';
import { Link } from 'react-router-dom';
import './SignForm.css';

function SignMain({ children, onSubmit, submitText, redirectText, redirectRoute, linkText, values, apiError, isValid, resetForm }) {

    function handleSubmit(event) {
        event.preventDefault();
        onSubmit(values, resetForm);
    }

    return (
        <form className='form' 
        onSubmit={handleSubmit}>
            {children}

            <div className='form__bottom'>
                <span className='form__error form__error_submit'>{apiError}</span>

                <button type='submit' 
                className={`form__submit ${isValid ? '' : 'form__submit_disabled'}`}
                disabled={!isValid}>{submitText}</button>

                <p className='form__redirect'>{redirectText} 
                    <Link to={redirectRoute} 
                    className='form__redirect_green'>{linkText}</Link>
                </p>
            </div>
        </form>
    )
}

export default SignMain;