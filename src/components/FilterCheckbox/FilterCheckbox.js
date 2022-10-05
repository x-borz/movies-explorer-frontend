import './FilterCheckbox.css';
import React from "react";

function FilterCheckbox({id, isChecked, setIsChecked}) {
  return (
    <label className='filter-checkbox'>
      <input className='filter-checkbox__checkbox' type="checkbox" id={id} checked={isChecked} onChange={() => setIsChecked(v => !v)}/>
      <span className='filter-checkbox__slider'></span>
    </label>
  );
}

export default FilterCheckbox;

