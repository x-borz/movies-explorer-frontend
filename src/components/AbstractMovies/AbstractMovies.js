import './AbstractMovies.css';
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";
import SearchForm from "../SearchForm/SearchForm";

function AbstractMovies({isSavedMoviesPage, movies, onSubmit}) {
  return (
    <main className='abstract-movies page__section'>
      <SearchForm onSubmit={onSubmit}/>
      <MoviesCardList isSavedMoviesPage={isSavedMoviesPage}>
        {movies.map((movie, i) =>
          <MoviesCard key={i} movie={movie}/>
        )}
      </MoviesCardList>
    </main>
  );
}

export default AbstractMovies;
