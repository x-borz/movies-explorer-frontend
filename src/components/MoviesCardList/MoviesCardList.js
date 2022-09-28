import './MoviesCardList.css';

function MoviesCardList({isSavedMoviesPage, children}) {
  return (
    <section className='movies-card-list'>
      <ul className={`movies-card-list__container ${isSavedMoviesPage ? 'movies-card-list__container_type_saved-movies' : ''}`}>
        {children}
      </ul>
      {!isSavedMoviesPage && <button className='movies-card-list__more-btn' type='button'>Ещё</button>}
    </section>
  );
}

export default MoviesCardList;
