import './FilterCheckbox.css';
import React from "react";

function FilterCheckbox({id, isChecked, setIsChecked, onClick}) {
  return (
    <label className='filter-checkbox'>
      <input className='filter-checkbox__checkbox' type="checkbox" id={id} checked={isChecked} onChange={() => setIsChecked(v => !v)} onClick={onClick}/>
      <span className='filter-checkbox__slider'></span>
    </label>
  );
}

export default FilterCheckbox;

