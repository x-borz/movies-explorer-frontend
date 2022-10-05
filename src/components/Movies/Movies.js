import AbstractMovies from "../AbstractMovies/AbstractMovies";
import {useEffect, useState} from "react";
import moviesApi from "../../utils/MoviesApi";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";

function Movies({notification, onNotificationClose, setNotification}) {
  const isSavedMoviesPage = false;

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

    localStorage.setItem('search', JSON.stringify({searchString, isChecked, movies}));
  }

  const handleSearchMovies = async (searchString, isChecked) => {
    if (!searchString) {
      setNotification({content: 'Нужно ввести ключевое слово', isSuccessful: false});
      return;
    }

    setHasNoAttempts(false);
    setIsLoading(true);

    const search = searchString.toLowerCase();

    let movies;

    try {
      movies = await moviesApi.getMovies();
    } catch (err) {
      setNotification({content: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз', isSuccessful: false});
      return;
    } finally {
      saveData(searchString, isChecked, []);
      setIsLoading(false);
    }

    movies = movies.filter(movie => {
      return (isChecked ? movie.duration <= 40 : true) &&
        (
          movie.nameRU.toLowerCase().includes(search) ||
          movie.nameEN.toLowerCase().includes(search) ||
          movie.country.toLowerCase().includes(search) ||
          movie.director.toLowerCase().includes(search) ||
          movie.description.toLowerCase().includes(search)
        )
    });

    setMovieIndex(0);

    saveData(searchString, isChecked, movies);
    setIsLoading(false);
  };

  const clickMoreButton = () => {
    setMovieIndex(movieIndex + 3);
  }

  useEffect(() => {
    const search = localStorage.getItem('search')

    setHasNoAttempts(!search);

    setMovieIndex(0);

    try {
      const {searchString, isChecked, movies} = JSON.parse(search);

      setSearchString(searchString);
      setIsChecked(isChecked);
      setMovies(movies);
    } catch (err) {
      setSearchString('');
      setIsChecked(false);
      setMovies([]);
    }
  }, []);

  useEffect(() => {
    setIsMoreBtnVisible(movieIndex + 3 <= movies.length);
    setMoviesToShow(movies.slice(0, movieIndex + 3));
  }, [movieIndex, movies]);

  const hasNoContent = movies.length === 0;

  return (
    <AbstractMovies
      isSavedMoviesPage={isSavedMoviesPage}
      searchString={searchString}
      setSearchString={setSearchString}
      isChecked={isChecked}
      setIsChecked={setIsChecked}
      onSearch={handleSearchMovies}
      notification={notification}
      onNotificationClose={onNotificationClose}
      isMoreBtnVisible={isMoreBtnVisible}
      onMoreBtnClick={clickMoreButton}
    >
      {isLoading && <Preloader/>}
      {!isLoading && !hasNoAttempts && hasNoContent && <span className='abstract-movies__not-found'>Ничего не найдено</span>}
      {!isLoading && !hasNoAttempts && !hasNoContent &&
        <MoviesCardList>
          {moviesToShow.map(moviesToShow =>
            <MoviesCard key={moviesToShow.id} movie={moviesToShow}/>
          )}
        </MoviesCardList>
      }
    </AbstractMovies>
  );
}

export default Movies;
