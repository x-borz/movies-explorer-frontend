import AbstractMovies from "../AbstractMovies/AbstractMovies";
import {useEffect, useState} from "react";
import mainApi from "../../utils/MainApi";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";

function SavedMovies({notification, onNotificationClose, setNotification}) {
  const isSavedMoviesPage = true;

  const [searchString, setSearchString] = useState('')
  const [isChecked, setIsChecked] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const movies = await mainApi.getAllMovies();
        setSavedMovies(movies);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, []);

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
      setNotification={setNotification}
      onNotificationClose={onNotificationClose}
      isMoreBtnVisible={false}
    >
      <MoviesCardList>
        {savedMovies.map(movie =>
          <MoviesCard key={movie._id} movie={movie} onButtonClick={() => {}} isSavedMoviesPage={true}/>
        )}
      </MoviesCardList>
    </AbstractMovies>
  );
}

export default SavedMovies;
