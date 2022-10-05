import './Notification.css';
import {useEffect} from "react";

function Notification({modifier, notification, onClose}) {
  useEffect(() => {
    if (notification.content) {
      const timer = setTimeout(onClose, 10000);
      return () => {
        onClose();
        clearTimeout(timer);
      }
    }
  }, [notification.content]);

  return (
    <section className={`notification ${modifier ? 'notification_place_' + modifier : ''} ${notification.content ? 'notification_visible' : ''}`}>
      <div className='notification__header'>
        <div className={`notification__icon ${notification.isSuccessful ? 'notification__icon_successful' : 'notification__icon_errored'}`}/>
        <h2 className='notification__header-title'>{notification.isSuccessful ? 'Успех' : 'Ошибка'}</h2>
        <button className='notification__close-btn' type='button' onClick={onClose}/>
      </div>
      <p className='notification__text'>{notification.content}</p>
    </section>
  );
}

export default Notification;

