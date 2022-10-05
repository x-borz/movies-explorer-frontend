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

      <MoviesCardList>
        {movies.map(movie =>
          <MoviesCard key={movie.id} movie={movie}/>
        )}
      </MoviesCardList>

      <div className={`abstract-movies__more ${isSavedMoviesPage? 'abstract-movies__more_place_saved-movies' : ''}`}>
        <button className={`abstract-movies__more-btn ${isSavedMoviesPage ? 'abstract-movies__more-btn_hidden' : ''}`} type='button'>Ещё</button>
      </div>
    </main>
  );
}

export default AbstractMovies;
