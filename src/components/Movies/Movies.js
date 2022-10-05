import AbstractMovies from "../AbstractMovies/AbstractMovies";
import {useEffect, useState} from "react";
import moviesApi from "../../utils/MoviesApi";

function Movies({notification, onNotificationClose, setNotification}) {
  const isSavedMoviesPage = false;

  const [searchString, setSearchString] = useState('')
  const [isChecked, setIsChecked] = useState(false);
  const [movies, setMovies] = useState([]);
  const [hasBeenSearched, setHasBeenSearched] = useState(false);

  const handleSearchMovies = async (searchString, isChecked) => {
    if (!searchString) {
      setNotification({content: 'Нужно ввести ключевое слово', isSuccessful: false});
      return;
    }

    const search = searchString.toLowerCase();
    let movies = [];

    try {
      movies = await moviesApi.getMovies();
    } catch (err) {
      console.log(err);
      //todo: вывести ошибку куда надо
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
    })

    const data = {searchString, isChecked, movies};

    setSearchString(searchString);
    setIsChecked(isChecked);
    setMovies(movies);

    localStorage.setItem('search', JSON.stringify(data));
  };

  useEffect(() => {
    const search = localStorage.getItem('search')

    setHasBeenSearched(!!search);

    if (!search) {
      setSearchString('');
      setIsChecked(false);
      setMovies([]);

      return;
    }

    const {searchString, isChecked, movies} = JSON.parse(search);

    setSearchString(searchString);
    setIsChecked(isChecked);
    setMovies(movies);
  }, []);

  return (
    <AbstractMovies
      isSavedMoviesPage={isSavedMoviesPage}
      movies={movies}
      searchString={searchString}
      setSearchString={setSearchString}
      isChecked={isChecked}
      setIsChecked={setIsChecked}
      hasBeenSearched={hasBeenSearched}
      onSearch={handleSearchMovies}
      notification={notification}
      onNotificationClose={onNotificationClose}
    />
  );
}

export default Movies;
