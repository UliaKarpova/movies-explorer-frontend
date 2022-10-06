import React from 'react';
import './AboutMe.css';
import '../Main.css';
import photo from '../../../images/photo.jpeg'

function AboutMe() {
    return (
        <section className='about-me'>
            <h2 id='about-me' className='main__title'>Студент</h2>
            <div className='about-me__full'>
            <img src={photo} alt='Фото' className='about-me__photo' />
            <div className='about-me__block'>
                <h3 className='about-me__name'>Юлия</h3>
                <h4 className='about-me__line'>Фронтенд-разработчик, 35 лет</h4>
                <p className='about-me__info'>Я родилась и живу в Майкопе, закончила факультет педагогики, 
                психологии и коммуникативистики КубГУ (г. Краснодар). Замужем, есть дочь. Я люблю долгие прогулки 
                и походы выходного дня. С 2012 г. работала верстальщиком в полиграфии, но захотелось расширить свои знания 
                и сменить сферу деятельности. Сейчас заканчиваю курс по веб-разработке и активно ищу новую работу.</p>
                <div className='about-me__links'>
                    <a href='https://github.com/UliaKarpova' target='_blank' rel='noreferrer noopener' className='about-me__link'>Github</a>
                    <a href='https://t.me/Ulia_Karpova' target='_blank' rel='noreferrer noopener' className='about-me__link'>Telegram</a>
                </div>
            </div>
            </div>
        </section>
    )
}

export default AboutMe;