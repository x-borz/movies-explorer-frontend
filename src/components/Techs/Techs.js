import './Techs.css';
import SectionTitle from "../SectionTitle/SectionTitle";

function Techs(props) {
  const technologies = ['HTML', 'CSS', 'JS', 'React', 'Git', 'express.js', 'mongoDB'];

  return (
    <section className='techs'>
      <SectionTitle modifier={'techs__section-title'}>Технологии</SectionTitle>
      <h3 className='techs__subtitle'>7 технологий</h3>
      <p className='techs__paragraph'>На&nbsp;курсе веб-разработки мы&nbsp;освоили технологии, которые применили в&nbsp;дипломном проекте.</p>
      <ul className='techs__technologies-list'>
        {
          technologies.map((value, i) =>
            <li className='techs__technology-item' key={i}>{value}</li>
        )}
      </ul>
    </section>
  );
}

export default Techs;
