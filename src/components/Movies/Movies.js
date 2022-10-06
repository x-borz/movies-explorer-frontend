import AbstractMovies from "../AbstractMovies/AbstractMovies";
import {useContext, useEffect, useState} from "react";
import moviesApi from "../../utils/MoviesApi";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";
import {filterMovies, getIndexStep} from "../../utils/utils";
import mainApi from "../../utils/MainApi";
import {MOVIES_API_URL} from "../../utils/constants";
import NotificationContext from "../../contexts/NotificationContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Movies({savedMovies, setSavedMovies}) {
  const {showFailedNotification} = useContext(NotificationContext);
  const {localStorageSearch, localStorageMovieIndex} = useContext(CurrentUserContext);

  const [searchString, setSearchString] = useState('')
  const [isChecked, setIsChecked] = useState(false);
  const [movies, setMovies] = useState([]);
  const [hasNoAttempts, setHasNoAttempts] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [movieIndex, setMovieIndex] = useState(-1);
  const [moviesToShow, setMoviesToShow] = useState([]);
  const [isMoreBtnVisible, setIsMoreBtnVisible] = useState(false);

  const saveData = (searchString, isChecked, movies) => {
    setSearchString(searchString);
    setIsChecked(isChecked);
    setMovies(movies);

    localStorage.setItem(localStorageSearch, JSON.stringify({searchString, isChecked, movies}));
  }

  const saveMovieIndex = (index) => {
    setMovieIndex(index);
    localStorage.setItem(localStorageMovieIndex, index);
  }

  const handleSearchMovies = async (searchString, isChecked) => {
    setHasNoAttempts(false);
    setIsLoading(true);

    let movies = [];

    try {
      movies = await moviesApi.getMovies();
    } catch (err) {
      showFailedNotification('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
    }

    movies = filterMovies(movies, searchString, isChecked);
    movies.map(movie => movie.savedMovie = savedMovies.find(m => m.movieId === movie.id));

    saveData(searchString, isChecked, movies);
    setIsLoading(false);

    saveMovieIndex(0);
  };

  const clickMoreButton = () => saveMovieIndex(movieIndex + getIndexStep());

  const handleCardButtonClick = async (movie) => {
    if (movie.savedMovie) {  // если фильм лайкнут - удалить из избранного
      try {
        await mainApi.deleteMovie(movie.savedMovie._id);
        setSavedMovies(prevMovies => prevMovies.filter(m => movie.savedMovie._id !== m._id));
      } catch (err) {
        showFailedNotification(err.message);
      }
    } else {  // если фильм еще не лайкнут - добавить в избраннное
      try {
        const newMovie = await mainApi.createMovie({
          country: movie.country,
          director: movie.director,
          duration: movie.duration,
          year: movie.year,
          description: movie.description,
          image: MOVIES_API_URL + '/' + movie.image.url,
          trailerLink: movie.trailerLink,
          nameRU: movie.nameRU,
          nameEN: movie.nameEN,
          thumbnail: MOVIES_API_URL + '/' + movie.image.formats.thumbnail.url,
          movieId: movie.id
        });
        setSavedMovies([...savedMovies, newMovie]);
      } catch (err) {
        showFailedNotification(err.message);
      }
    }
  }

  useEffect(() => {
    const search = localStorage.getItem(localStorageSearch)

    setHasNoAttempts(!search);

    try {
      setMovieIndex(+localStorage.getItem(localStorageMovieIndex));
    } catch (err) {
      setMovieIndex(0);
    }

    try {
      const {searchString, isChecked, movies} = JSON.parse(search);

      movies.map(movie => movie.savedMovie = savedMovies.find(m => m.movieId === movie.id));

      setSearchString(searchString);
      setIsChecked(isChecked);
      setMovies(movies);
    } catch (err) {
      setSearchString('');
      setIsChecked(false);
      setMovies([]);
    }
  }, [savedMovies]);

  useEffect(() => {
    const nextIndex = movieIndex + getIndexStep();
    setIsMoreBtnVisible(nextIndex < movies.length);
    setMoviesToShow(movies.slice(0, nextIndex));
  }, [movieIndex, movies]);

  const hasNoContent = movies.length === 0;

  return (
    <AbstractMovies
      isSavedMoviesPage={false}
      searchString={searchString}
      setSearchString={setSearchString}
      isChecked={isChecked}
      setIsChecked={setIsChecked}
      onSearch={handleSearchMovies}
      isMoreBtnVisible={isMoreBtnVisible}
      onMoreBtnClick={clickMoreButton}
      hasNoAttempts={hasNoAttempts}
    >
      {isLoading && <Preloader/>}
      {!isLoading && !hasNoAttempts && hasNoContent && <span className='abstract-movies__not-found'>Ничего не найдено</span>}
      {!isLoading && !hasNoAttempts && !hasNoContent &&
        <MoviesCardList>
          {moviesToShow.map(movie =>
            <MoviesCard key={movie.id} movie={movie} onButtonClick={handleCardButtonClick} isSavedMoviesPage={false}/>
          )}
        </MoviesCardList>
      }
    </AbstractMovies>
  );
}

export default Movies;
