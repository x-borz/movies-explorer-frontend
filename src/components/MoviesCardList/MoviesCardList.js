import './MoviesCardList.css';

function MoviesCardList({children}) {
  return (
    <section className='movies-card-list'>
      <ul className={`movies-card-list__container`}>
        {children}
      </ul>
    </section>
  );
}

export default MoviesCardList;
