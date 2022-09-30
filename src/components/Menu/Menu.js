import './Menu.css';
import Navigation from "../Navigation/Navigation";

function Menu({isMenuVisible, onMenuClose}) {
  return (
    <section className={`menu ${isMenuVisible ? 'menu_visible' : ''}`}>
      <div className='menu__panel'>
        <Navigation modifier='menu' onMenuClose={onMenuClose}/>
        <button className='menu__close-btn' type='button' onClick={onMenuClose}/>
      </div>
    </section>
  );
}

export default Menu;
