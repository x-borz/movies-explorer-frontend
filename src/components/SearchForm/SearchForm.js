import './SearchForm.css';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm(props) {
  return (
    <form className='search-form'>
      <div className='search-form__input-with-btn-group'>
        <input className='search-form__input' type='text' placeholder='Фильм'/>
        <button className='search-form__search-btn' type='button'>Найти</button>
      </div>
      <div className='search-form__checkbox-group'>
        <FilterCheckbox id='filter-checkbox'/>
        <label className='search-form__checkbox-label' htmlFor='filter-checkbox'>Короткометражки</label>
      </div>
    </form>
  );
}

export default SearchForm;
