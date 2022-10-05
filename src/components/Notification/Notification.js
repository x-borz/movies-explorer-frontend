import './Notification.css';
import {useContext, useEffect} from "react";
import NotificationContext from "../../contexts/NotificationContext";

function Notification({modifier}) {
  const {notification, closeNotification} = useContext(NotificationContext);

  useEffect(() => {
    if (notification.content) {
      const timer = setTimeout(closeNotification, 10000);
      return () => {
        closeNotification();
        clearTimeout(timer);
      }
    }
  }, [notification.content]);

  return (
    <section className={`notification ${modifier ? 'notification_place_' + modifier : ''} ${notification.content ? 'notification_visible' : ''}`}>
      <div className='notification__header'>
        <div className={`notification__icon ${notification.isSuccessful ? 'notification__icon_successful' : 'notification__icon_errored'}`}/>
        <h2 className='notification__header-title'>{notification.isSuccessful ? 'Успех' : 'Ошибка'}</h2>
        <button className='notification__close-btn' type='button' onClick={closeNotification}/>
      </div>
      <p className='notification__text'>{notification.content}</p>
    </section>
  );
}

export default Notification;

