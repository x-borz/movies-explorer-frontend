import AbstractMovies from "../AbstractMovies/AbstractMovies";
import {useContext, useEffect, useState} from "react";
import mainApi from "../../utils/MainApi";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";
import {filterMovies} from "../../utils/utils";
import NotificationContext from "../../contexts/NotificationContext";

function SavedMovies({savedMovies, setSavedMovies}) {
  const {showFailedNotification} = useContext(NotificationContext);

  const [searchString, setSearchString] = useState('')
  const [isChecked, setIsChecked] = useState(false);
  const [savedMoviesToShow, setSavedMoviesToShow] = useState([]);

  // обрабатываем клик по кнопке поиска: фильтруем фильмы по строке поиска и чекбоксу
  const handleSearchMovies = (searchString, isChecked) => {
    setSavedMoviesToShow(filterMovies(savedMovies, searchString, isChecked));
  }

  // обрабатываем клик по кнопке удаления карточки из избранного пользователя
  const handleMoviesCardButtonClick = async (movie) => {
    try {
      await mainApi.deleteMovie(movie._id);
      setSavedMovies(prevMovies => prevMovies.filter(m => movie._id !== m._id));
    } catch (err) {
      showFailedNotification(err);
    }
  }

  useEffect(() => {
    setSavedMoviesToShow(filterMovies(savedMovies, searchString, isChecked));
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
      hasNoContent={hasNoContent}
    >
      {hasNoContent && <span className='abstract-movies__not-found'>Ничего не найдено</span>}
      {!hasNoContent &&
        <MoviesCardList>
          {savedMoviesToShow.map(movie =>
            <MoviesCard key={movie._id} movie={movie} onButtonClick={handleMoviesCardButtonClick} isSavedMoviesPage={true}/>
          )}
        </MoviesCardList>
      }
    </AbstractMovies>
  );
}

export default SavedMovies;
