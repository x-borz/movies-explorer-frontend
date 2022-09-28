import './MoviesCard.css';

function MoviesCard({movie}) {
  return (
    <li className='movies-card'>
      <h2 className='movies-card__title'>{movie.name}</h2>
      <p className='movies-card__duration'>{movie.duration}</p>
      <img className='movies-card__img' src={movie.img} alt={movie.name}/>
      <button type='button' className={`movies-card__button ${
        movie.isSavedMoviesPage ? 'movies-card__button_type_drop' :
        movie.isLiked ? 'movies-card__button_type_active-save' : 'movies-card__button_type_inactive-save'}`}/>
    </li>
  );
}

export default MoviesCard;
