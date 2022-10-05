import './AbstractMovies.css';
import SearchForm from "../SearchForm/SearchForm";
import Notification from "../Notification/Notification";

function AbstractMovies({isSavedMoviesPage, searchString, setSearchString, isChecked, setIsChecked, onSearch, isMoreBtnVisible, onMoreBtnClick, children}) {
  return (
    <main className='abstract-movies page__section'>
      <Notification modifier='abstract-movies'/>
      <SearchForm onSubmit={onSearch} searchString={searchString} setSearchString={setSearchString} isChecked={isChecked} setIsChecked={setIsChecked}/>
      {children}
      <div className={`abstract-movies__more ${isSavedMoviesPage? 'abstract-movies__more_place_saved-movies' : ''}`}>
        <button className={`abstract-movies__more-btn ${!isMoreBtnVisible ? 'abstract-movies__more-btn_hidden' : ''}`} type='button' onClick={onMoreBtnClick}>Ещё</button>
      </div>
    </main>
  );
}

export default AbstractMovies;
