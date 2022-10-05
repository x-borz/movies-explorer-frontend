import './AbstractMovies.css';
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";
import SearchForm from "../SearchForm/SearchForm";
import Notification from "../Notification/Notification";

function AbstractMovies({isSavedMoviesPage, movies, searchString, setSearchString, isChecked, setIsChecked, hasBeenSearched, onSearch, notification, onNotificationClose}) {
  return (
    <main className='abstract-movies page__section'>
      <Notification modifier='abstract-movies' notification={notification} onClose={onNotificationClose}/>
      <SearchForm onSubmit={onSearch} searchString={searchString} setSearchString={setSearchString} isChecked={isChecked} setIsChecked={setIsChecked}/>
      {
        // hasBeenSearched &&
        <MoviesCardList isSavedMoviesPage={isSavedMoviesPage}>
          {movies.map(movie =>
            <MoviesCard key={movie.id} movie={movie}/>
          )}
        </MoviesCardList>
      }
    </main>
  );
}

export default AbstractMovies;
