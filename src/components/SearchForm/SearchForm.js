import './SearchForm.css';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({isSavedMoviesPage, onSubmit, searchString, setSearchString, isChecked, setIsChecked, hasNoAttempts}) {

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(searchString, isChecked, false);
  }

  const handleCheckboxClick = () => {
    if (!hasNoAttempts) {
      onSubmit(searchString, !isChecked, true);
    }
  }

  return (
    <form className='search-form' onSubmit={handleSubmit} noValidate>
      <div className='search-form__input-with-btn-group'>
        <input className='search-form__input' type='text' placeholder='Фильм' required value={searchString} onChange={evt => setSearchString(evt.target.value)}/>
        <button className='search-form__search-btn' type='submit'>Найти</button>
      </div>
      <div className='search-form__checkbox-group'>
        <FilterCheckbox id={`filter-checkbox-${isSavedMoviesPage ? 'saved-movies' : 'movies'}`} isChecked={isChecked} setIsChecked={setIsChecked} onClick={handleCheckboxClick}/>
        <label className='search-form__checkbox-label' htmlFor={`filter-checkbox-${isSavedMoviesPage ? 'saved-movies' : 'movies'}`}>Короткометражки</label>
      </div>
    </form>
  );
}

export default SearchForm;
