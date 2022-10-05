import AbstractMovies from "../AbstractMovies/AbstractMovies";
import {useState} from "react";

function SavedMovies({notification, onNotificationClose, setNotification}) {
  const isSavedMoviesPage = true;

  const [searchString, setSearchString] = useState('')
  const [isChecked, setIsChecked] = useState(false);
  const [movies, setMovies] = useState([]);

  const handleSearchMovies = (searchString, isChecked) => {

  }

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
      isMoreBtnVisible={false}
    >

    </AbstractMovies>
  );
}

export default SavedMovies;
