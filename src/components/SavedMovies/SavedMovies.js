import AbstractMovies from "../AbstractMovies/AbstractMovies";
import {useEffect, useState} from "react";
import mainApi from "../../utils/MainApi";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";
import {filterMovies} from "../../utils/utils";

function SavedMovies() {
  const isSavedMoviesPage = true;

  const [searchString, setSearchString] = useState('')
  const [isChecked, setIsChecked] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [savedMoviesToShow, setSavedMoviesToShow] = useState([]);

  const handleSearchMovies = (searchString, isChecked) => {
    setSearchString(searchString);
    setIsChecked(isChecked);
    setSavedMoviesToShow(filterMovies(savedMovies, searchString, isChecked));

    localStorage.setItem('searchSaved', JSON.stringify({searchString, isChecked}));
  }

  const handleCardButtonClick = async (movie) => {
    try {
      await mainApi.deleteMovie(movie._id);
      setSavedMovies(prevMovies => prevMovies.filter(m => movie._id !== m._id));
      localStorage.setItem('searchSaved', JSON.stringify({searchString, isChecked}));
    } catch (err) {
      //todo: вывод ошибки
      console.log(err);
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const movies = await mainApi.getAllMovies();
        setSavedMovies(movies);
      } catch (err) {
        //todo: вывод ошибки
        console.log(err);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    try {
      const {searchString, isChecked} = JSON.parse(localStorage.getItem('searchSaved'));
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
      isSavedMoviesPage={isSavedMoviesPage}
      searchString={searchString}
      setSearchString={setSearchString}
      isChecked={isChecked}
      setIsChecked={setIsChecked}
      onSearch={handleSearchMovies}
      isMoreBtnVisible={false}
    >
      {hasNoContent
        ? <span className='abstract-movies__not-found'>Ничего не найдено</span>
        : <MoviesCardList>
            {savedMoviesToShow.map(movie =>
              <MoviesCard key={movie._id} movie={movie} onButtonClick={handleCardButtonClick} isSavedMoviesPage={true}/>
            )}
          </MoviesCardList>
      }
    </AbstractMovies>
  );
}

export default SavedMovies;
