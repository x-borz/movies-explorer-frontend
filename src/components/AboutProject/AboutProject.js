import './AboutProject.css';

function AboutProject(props) {
  return (
    <section className='about_project' id='about_project'>
      <div className='about_project__container'>
        <h2 className='about_project__section-title'>О проекте</h2>
        <ul className='about_project__characteristics-list'>
          <li>
            <h3 className='about_project__characteristic-title'>Дипломный проект включал 5 этапов</h3>
            <p className='about_project__characteristic-paragraph'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          </li>
          <li>
            <h3 className='about_project__characteristic-title'>На выполнение диплома ушло 5 недель</h3>
            <p className='about_project__characteristic-paragraph'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </li>
        </ul>
        <div className='about_project__timing-grid'>
          <p className='about_project__timing-cell about_project__timing-cell_duration_one-week'>1 неделя</p>
          <p className='about_project__timing-cell about_project__timing-cell_duration_four-weeks'>4 недели</p>
          <p className='about_project__timing-cell'>Back-end</p>
          <p className='about_project__timing-cell'>Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
