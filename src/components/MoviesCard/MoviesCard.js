import './MoviesCard.css';
import {moviesApiUrl} from "../../utils/constants";
import {formatDuration} from "../../utils/utils";

function MoviesCard({movie, onButtonClick, isSavedMoviesPage}) {
  const img = isSavedMoviesPage ? movie.image : `${moviesApiUrl}/${movie.image.url}`;

  const handleCardClick = () => {
    window.open(movie.trailerLink, '_blank', 'noopener,noreferrer');
  }

  const handleButtonClick = (evt) => {
    evt.stopPropagation();
    onButtonClick(movie);
  }

  return (
    <li className='movies-card' onClick={handleCardClick}>
      <h2 className='movies-card__title'>{movie.nameRU}</h2>
      <p className='movies-card__duration'>{formatDuration(movie.duration)}</p>
      <img className='movies-card__img' src={img} alt={movie.nameRU}/>
      <button type='button' className={`movies-card__button ${
        isSavedMoviesPage ? 'movies-card__button_type_drop' :
        movie.savedMovie ? 'movies-card__button_type_active-save' : 'movies-card__button_type_inactive-save'}`} onClick={handleButtonClick}/>
    </li>
  );
}

export default MoviesCard;
