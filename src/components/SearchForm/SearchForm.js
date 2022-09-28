import './SearchForm.css';

function SearchForm(props) {
  return (
    <form className='search-form'>
      <div className='search-form__input-with-btn'>
        <input className='search-form__input' type='text' placeholder='Фильм'/>
        <button className='search-form__search-btn' type='button'>Найти</button>
      </div>
    </form>
  );
}

export default SearchForm;
