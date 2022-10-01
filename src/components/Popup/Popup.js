import './Popup.css';

function Popup({isPopupOpened, onClose, onSubmit}) {
  return (
    <section className={`popup ${isPopupOpened ? 'popup_opened' : ''}`} onMouseDown={onClose}>
      <div className="popup__container" onMouseDown={evt => evt.stopPropagation()}>
        <button className="popup__close-button" type="button" onMouseDown={onClose}></button>
        <h2 className='popup__heading'>Редактировать профиль</h2>
        <form className="popup__form" onSubmit={onSubmit}>
          <input className="popup__input" type="text" placeholder="Имя" required minLength="2" maxLength="30" name="name"/>
          <span className="popup__error"></span>
          <input className="popup__input" type="text" placeholder="Email" required name="email"/>
          <span className="popup__error"></span>
          <button className="popup__submit-button" type="submit">Сохранить</button>
        </form>
      </div>
    </section>
  )
}

export default Popup;
