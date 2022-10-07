import AbstractMovies from "../AbstractMovies/AbstractMovies";
import {useContext, useEffect, useState} from "react";
import moviesApi from "../../utils/MoviesApi";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";
import {filterMovies, getIndexStep} from "../../utils/utils";
import mainApi from "../../utils/MainApi";
import {LOCAL_STORAGE_ALL_MOVIES, MOVIES_API_URL} from "../../utils/constants";
import NotificationContext from "../../contexts/NotificationContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Movies({savedMovies, setSavedMovies, isLoggedIn}) {
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

  const saveMovieIndex = (index) => {
    setMovieIndex(index);
    localStorage.setItem(localStorageMovieIndex, index);
  }

  const filterMoviesAndAssignWithSavedMovies = (allMovies, searchString, isChecked) => {
    // фильтруем фильмы в соотвествии с введенными критериями
    let movies = filterMovies(allMovies, searchString, isChecked);

    // пробегаем по всем фильмам, связывая их с фильмами из избранного
    movies.map(movie => movie.savedMovie = savedMovies.find(m => m.movieId === movie.id));

    return movies;
  }

  const getAllMovies = async () => {
    let allMovies = null;

    try {
      allMovies = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ALL_MOVIES));
    } catch (err) {
    }

    // если фильмы не были ранее сохранены в локальное хранилище или не удалось разобрать даннные, качаем фильмы из внешнего api
    if (!allMovies) {
      try {
        allMovies = await moviesApi.getMovies();
        localStorage.setItem(LOCAL_STORAGE_ALL_MOVIES, JSON.stringify(allMovies));
      } catch (err) {
        showFailedNotification('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
        throw Error();
      }
    }

    return allMovies;
  }

  const handleSearchMovies = async (searchString, isChecked, submitFromCheckbox) => {
    setIsLoading(true);

    let allMovies;

    try {
      allMovies = await getAllMovies();
    } catch (err) {
      setIsLoading(false);
      return;
    }

    setHasNoAttempts(false);

    const movies = filterMoviesAndAssignWithSavedMovies(allMovies, searchString, isChecked);

    setMovies(movies);

    localStorage.setItem(localStorageSearch, JSON.stringify({searchString, isChecked}));

    setIsLoading(false);

    if (!submitFromCheckbox) {
      saveMovieIndex(0);
    }
  };

  const clickMoreButton = () => saveMovieIndex(movieIndex + getIndexStep());

  const handleMoviesCardButtonClick = async (movie) => {
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
    try {
      const allMovies = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ALL_MOVIES));
      const {searchString, isChecked} = JSON.parse(localStorage.getItem(localStorageSearch));

      const movies = filterMoviesAndAssignWithSavedMovies(allMovies, searchString, isChecked);

      setSearchString(searchString);
      setIsChecked(isChecked);
      setMovies(movies);

      setHasNoAttempts(false);

      try {
        setMovieIndex(+localStorage.getItem(localStorageMovieIndex));
      } catch (err) {
        setMovieIndex(0);
      }
    } catch (err) {
      setSearchString('');
      setIsChecked(false);
      setMovies([]);
      setMovieIndex(0);
    }
  }, [savedMovies]);

  useEffect(() => {
    const nextIndex = movieIndex + getIndexStep();
    setIsMoreBtnVisible(nextIndex < movies.length);
    setMoviesToShow(movies.slice(0, nextIndex));
  }, [movieIndex, movies]);

  // сбрасываем стейты при разлогине
  useEffect(() => {
    if (!isLoggedIn) {
      setSearchString('');
      setMovies([]);
      setMovieIndex(0);
      setMoviesToShow([]);
    }
  }, [isLoggedIn])

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
      hasNoContent={hasNoContent}
    >
      {isLoading && <Preloader/>}
      {!isLoading && !hasNoAttempts && hasNoContent && <span className='abstract-movies__not-found'>Ничего не найдено</span>}
      {!isLoading && !hasNoAttempts && !hasNoContent &&
        <MoviesCardList>
          {moviesToShow.map(movie =>
            <MoviesCard key={movie.id} movie={movie} onButtonClick={handleMoviesCardButtonClick} isSavedMoviesPage={false}/>
          )}
        </MoviesCardList>
      }
    </AbstractMovies>
  );
}

export default Movies;
