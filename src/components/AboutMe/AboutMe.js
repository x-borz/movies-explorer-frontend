import './AboutMe.css';
import SectionTitle from "../SectionTitle/SectionTitle";
import photo from '../../images/photo.jpg';

function AboutMe(props) {
  return (
    <section className='about-me' id='about-me'>
      <div className='about-me__container'>
        <SectionTitle modifier={'about-me__section-title'}>Студент</SectionTitle>
        <div className='about-me__student-dossier'>
          <div className='about-me__student-info'>
            <h3 className='about-me__student-name'>Ренат</h3>
            <p className='about-me__student-profession'>Фронтенд-разработчик, 40 лет</p>
            <p className='about-me__student-description'>Я родился и живу в городе Рыбинске Ярославской области.
              Окончил Рыбинскую государственную авиационную технологическую академию, курс "Вычислительные системы" в 2003 году.
              Женат, двое детей. Работаю Java-разработчиком. Завершаю курс "Веб-разработчик" от Яндекс.Практикум.
            </p>
            <a className='about-me__link' target='_blank' rel='noreferrer' href='https://github.com/x-borz'>Github</a>
          </div>
          <img className='about-me__student-photo' alt='Ренат Кабанов' src={photo}/>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
