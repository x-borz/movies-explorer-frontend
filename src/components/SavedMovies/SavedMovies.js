import AbstractMovies from "../AbstractMovies/AbstractMovies";
import {useContext, useEffect, useState} from "react";
import mainApi from "../../utils/MainApi";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";
import {filterMovies} from "../../utils/utils";
import NotificationContext from "../../contexts/NotificationContext";
import Preloader from "../Preloader/Preloader";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SavedMovies({savedMovies, setSavedMovies}) {
  const {showFailedNotification} = useContext(NotificationContext);
  const {localStorageSearchSaved} = useContext(CurrentUserContext);

  const [searchString, setSearchString] = useState('')
  const [isChecked, setIsChecked] = useState(false);
  const [savedMoviesToShow, setSavedMoviesToShow] = useState([]);
  const [hasNoAttempts, setHasNoAttempts] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // обрабатываем клик по кнопке поиска: фильтруем фильмы по строке поиска и чекбоксу
  const handleSearchMovies = (searchString, isChecked) => {
    setIsLoading(true);
    setHasNoAttempts(false);
    setSavedMoviesToShow(filterMovies(savedMovies, searchString, isChecked));
    localStorage.setItem(localStorageSearchSaved, JSON.stringify({searchString, isChecked}));
    setIsLoading(false);
  }

  // обрабатываем клик по кнопке удаления карточки из избранного пользователя
  const handleCardButtonClick = async (movie) => {
    try {
      await mainApi.deleteMovie(movie._id);
      setSavedMovies(prevMovies => prevMovies.filter(m => movie._id !== m._id));
      localStorage.setItem(localStorageSearchSaved, JSON.stringify({searchString, isChecked}));
    } catch (err) {
      showFailedNotification('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
    }
  }

  // при изменении массива избранных фильмов готовим новый массив фильмов для отображения на странице
  useEffect(() => {
    const search = localStorage.getItem(localStorageSearchSaved);
    setHasNoAttempts(!search);

    try {
      const {searchString, isChecked} = JSON.parse(search);
      setSearchString(searchString);
      setIsChecked(isChecked);
      setSavedMoviesToShow(filterMovies(savedMovies, searchString, isChecked));
    } catch (err) {
      setSearchString('');
      setIsChecked(false);
      setSavedMoviesToShow([]);
    }
  }, [savedMovies]);

  const hasNoContent = savedMoviesToShow.length === 0;

  return (
    <AbstractMovies
      isSavedMoviesPage={true}
      searchString={searchString}
      setSearchString={setSearchString}
      isChecked={isChecked}
      setIsChecked={setIsChecked}
      onSearch={handleSearchMovies}
      isMoreBtnVisible={false}
      hasNoAttempts={hasNoAttempts}
    >
      {isLoading && <Preloader/>}
      {!isLoading && !hasNoAttempts && hasNoContent && <span className='abstract-movies__not-found'>Ничего не найдено</span>}
      {!isLoading && !hasNoAttempts && !hasNoContent &&
        <MoviesCardList>
          {savedMoviesToShow.map(movie =>
            <MoviesCard key={movie._id} movie={movie} onButtonClick={handleCardButtonClick} isSavedMoviesPage={true}/>
          )}
        </MoviesCardList>
      }
    </AbstractMovies>
  );
}

export default SavedMovies;
