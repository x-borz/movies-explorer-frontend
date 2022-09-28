import './FilterCheckbox.css';
import React from "react";

function FilterCheckbox({id}) {
  return (
    <label className='filter-checkbox'>
      <input className='filter-checkbox__checkbox' type="checkbox" id={id}/>
      <span className='filter-checkbox__slider'></span>
    </label>
  );
}

export default FilterCheckbox;

