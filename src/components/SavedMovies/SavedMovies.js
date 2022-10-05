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
    const movies = filterMovies(savedMovies, searchString, isChecked);
    setSearchString(searchString);
    setIsChecked(isChecked);
    setSavedMoviesToShow(movies);

    localStorage.setItem('searchSaved', JSON.stringify({searchString, isChecked, movies}));
  }

  const handleCardButtonClick = async (movie) => {
    try {
      await mainApi.deleteMovie(movie._id);
      setSavedMoviesToShow(prevMovies => prevMovies.filter(m => movie._id !== m._id));
      const {searchString, isChecked} = JSON.parse(localStorage.getItem('searchSaved'));
      localStorage.setItem('searchSaved', JSON.stringify({searchString, isChecked, movies: savedMoviesToShow}));
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
        //todo ошибки
        console.log(err);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    try {
      const {searchString, isChecked, movies} = JSON.parse(localStorage.getItem('searchSaved'));
      console.log(searchString, isChecked, movies)
      setSearchString(searchString);
      setIsChecked(isChecked);
      setSavedMoviesToShow(movies);
    } catch (err) {
      setSearchString('');
      setIsChecked(false);
      setSavedMoviesToShow([]);
    }

  }, []);

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
      <MoviesCardList>
        {savedMoviesToShow.map(movie =>
          <MoviesCard key={movie._id} movie={movie} onButtonClick={handleCardButtonClick} isSavedMoviesPage={true}/>
        )}
      </MoviesCardList>
    </AbstractMovies>
  );
}

export default SavedMovies;
