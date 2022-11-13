import React from 'react';

import './AboutProject.css';

import '../Main.css';

function AboutProject() {
    return (
        <section className='about-project'>
            <h2 id='about-project' 
            className='main__title'>О проекте</h2>

            <ul className='about-project__container'>
                <li className='about-project__container-column'>
                    <h3 className='about-project__subtitle'>Дипломный проект включал 5 этапов</h3>

                    <p className='about-project__text'>Составление плана, работу над бэкендом, вёрстку, 
                    добавление функциональности и финальные доработки.</p>
                </li>

                <li className='about-project__container-column'>
                    <h3 className='about-project__subtitle'>На выполнение диплома ушло 5 недель</h3>

                    <p className='about-project__text'>У каждого этапа был мягкий и жёсткий дедлайн, 
                    которые нужно было соблюдать, чтобы успешно защититься.</p>
                </li>
            </ul>

            <ul className='about-project__progress'>
                <li className='about-project__progress-line line-for-green'>
                    <p className='about-project__progress-span span-green'>1 неделя</p>

                    <p className='about-project__progress-caption'>Back-end</p>
                </li>

                <li className='about-project__progress-line'>
                    <p className='about-project__progress-span'>4 недели</p>

                    <p className='about-project__progress-caption'>Front-end</p>
                </li>
            </ul>

        </section>
    )
}

export default AboutProject;
