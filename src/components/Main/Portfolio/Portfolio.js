import React from 'react';

import './Portfolio.css';

import arrow from '../../../images/arrow.svg';

function Portfolio() {
    return (
        <section className='portfolio'>
            <h3 className='portfolio__title'>Портфолио</h3>

            <ul className='portfolio__list'>
                <li className='portfolio__item'>
                    <a href='https://uliakarpova.github.io/how-to-learn/' 
                    target='_blank' 
                    rel='noreferrer noopener' 
                    className='portfolio__link'>
                        <span className='portfolio__item-span'>Статичный сайт</span>

                        <img src={arrow} 
                        alt='Стрелка' 
                        className='portfolio__item-arrow' />
                    </a>
                </li>

                <li className='portfolio__item'>
                    <a href='https://uliakarpova.github.io/russian-travel/' 
                    target='_blank' 
                    rel='noreferrer noopener' 
                    className='portfolio__link'>
                        <span className='portfolio__item-span'>Адаптивный сайт</span>
                        <img src={arrow} 
                        alt='Стрелка' 
                        className='portfolio__item-arrow' />
                    </a>
                </li>

                <li className='portfolio__item'>
                    <a href='https://learn.more.nomoredomains.sbs/' 
                    target='_blank' 
                    rel='noreferrer noopener' 
                    className='portfolio__link'>
                        <span className='portfolio__item-span'>Одностраничное приложение</span>

                        <img src={arrow} 
                        alt='Стрелка' 
                        className='portfolio__item-arrow' />
                    </a>
                </li>
            </ul>
        </section>
    )
}

export default Portfolio;
