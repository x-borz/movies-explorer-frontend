import './Menu.css';
import Navigation from "../Navigation/Navigation";
import {useEffect} from "react";

function Menu({isMenuVisible, onMenuClose}) {

  useEffect(() => {
    const handleEscClose = evt => {
      if (evt.key === 'Escape') onMenuClose();
    }
    if (isMenuVisible) {
      document.addEventListener("keydown", handleEscClose);
      return () => document.removeEventListener("keydown", handleEscClose);
    }
  }, [isMenuVisible]);

  return (
    <section className={`menu ${isMenuVisible ? 'menu_visible' : ''}`}>
      <div className={`menu__sidebar ${isMenuVisible ? 'menu__sidebar_visible' : ''}`}>
        <Navigation modifier='menu' onMenuClose={onMenuClose}/>
        <button className='menu__close-btn' type='button' onClick={onMenuClose}/>
      </div>
    </section>
  );
}

export default Menu;
