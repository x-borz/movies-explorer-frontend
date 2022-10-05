import AbstractMovies from "../AbstractMovies/AbstractMovies";
import {useEffect, useState} from "react";

function SavedMovies({notification, onNotificationClose, setNotification}) {
  const isSavedMoviesPage = true;

  const [searchString, setSearchString] = useState('')
  const [isChecked, setIsChecked] = useState(false);
  const [movies, setMovies] = useState([]);
  const [hasBeenSearched, setHasBeenSearched] = useState(true);

  useEffect(() =>
    setMovies([
      {nameRU: '33 слова о дизайне', duration: '100', image: {url: '/uploads/stones_in_exile_b2f1b8f4b7.jpeg'}, isSavedMoviesPage},
      {nameRU: '34 слова о дизайне', duration: '102', image: {url: '/uploads/stones_in_exile_b2f1b8f4b7.jpeg'}, isSavedMoviesPage},
      {nameRU: '35 слов о дизайне', duration: '221', image: {url: '/uploads/stones_in_exile_b2f1b8f4b7.jpeg'}, isSavedMoviesPage},
    ])
  );

  const handleSearchMovies = (searchString, isChecked) => {

  }

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

export default SavedMovies;
