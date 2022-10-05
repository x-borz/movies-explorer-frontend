import './MoviesCard.css';
import {moviesApiUrl} from "../../utils/constants";
import {formatDuration} from "../../utils/utils";

function MoviesCard({movie, onButtonClick, isSavedMoviesPage}) {
  return (
    <li className='movies-card'>
      <h2 className='movies-card__title'>{movie.nameRU}</h2>
      <p className='movies-card__duration'>{formatDuration(movie.duration)}</p>
      <img className='movies-card__img' src={`${moviesApiUrl}/${movie.image.url}`} alt={movie.nameRU}/>
      <button type='button' className={`movies-card__button ${
        isSavedMoviesPage ? 'movies-card__button_type_drop' :
        movie.isLiked ? 'movies-card__button_type_active-save' : 'movies-card__button_type_inactive-save'}`} onClick={() => onButtonClick(movie)}/>
    </li>
  );
}

export default MoviesCard;
