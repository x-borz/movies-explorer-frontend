import './SearchForm.css';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({onSubmit, searchString, setSearchString, isChecked, setIsChecked}) {

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(searchString, isChecked);
  }

  return (
    <form className='search-form' onSubmit={handleSubmit} noValidate>
      <div className='search-form__input-with-btn-group'>
        <input className='search-form__input' type='text' placeholder='Фильм' required value={searchString} onChange={evt => setSearchString(evt.target.value)}/>
        <button className='search-form__search-btn' type='submit'>Найти</button>
      </div>
      <div className='search-form__checkbox-group'>
        <FilterCheckbox id='filter-checkbox' isChecked={isChecked} setIsChecked={setIsChecked}/>
        <label className='search-form__checkbox-label' htmlFor='filter-checkbox'>Короткометражки</label>
      </div>
    </form>
  );
}

export default SearchForm;
