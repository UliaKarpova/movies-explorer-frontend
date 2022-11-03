import React from 'react';

import './Footer.css';

function Footer() {
    const year = new Date();

    return (
        <footer className='footer'>
            <h2 className='footer__title'>Учебный проект Яндекс.Практикум и BeatFilm.</h2>

            <div className='footer__rights'>
                <div className='footer__rights-links'>
                    <a href='https://practicum.yandex.ru/' 
                    target='_blank' 
                    rel='noreferrer noopener' 
                    className='footer__link'>Яндекс.Практикум</a>

                    <a href='https://github.com/' 
                    target='_blank' 
                    rel='noreferrer noopener' 
                    className='footer__link'>Github</a>
                </div>

                <span className='footer__year'>&copy; {year.getFullYear()}</span>
            </div>
        </footer>
    )
}

export default Footer;
