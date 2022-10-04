import './SearchForm.css';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({onSubmit}) {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit();
  }

  return (
    <form className='search-form' onSubmit={handleSubmit}>
      <div className='search-form__input-with-btn-group'>
        <input className='search-form__input' type='text' placeholder='Фильм' required/>
        <button className='search-form__search-btn' type='submit'>Найти</button>
      </div>
      <div className='search-form__checkbox-group'>
        <FilterCheckbox id='filter-checkbox'/>
        <label className='search-form__checkbox-label' htmlFor='filter-checkbox'>Короткометражки</label>
      </div>
    </form>
  );
}

export default SearchForm;
