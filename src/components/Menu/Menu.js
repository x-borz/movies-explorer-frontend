import './Menu.css';
import Navigation from "../Navigation/Navigation";

function Menu({isMenuVisible, setIsMenuVisible}) {
  return (
    <section className={`menu ${isMenuVisible ? 'menu_visible' : ''}`}>
      <div className='menu__panel'>
        <Navigation modifier='menu' setIsMenuVisible={setIsMenuVisible}/>
        <button className='menu__close-btn' type='button' onClick={() => setIsMenuVisible(false)}/>
      </div>
    </section>
  );
}

export default Menu;
