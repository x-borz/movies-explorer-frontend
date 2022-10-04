import './ErrorMessage.css';
import {useEffect} from "react";

function ErrorMessage({modifier, message, onClose}) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <section className={`error-msg ${modifier ? 'error-msg_place_' + modifier : ''} ${message ? 'error-msg_visible' : ''}`}>
      <div className='error-msg__header'>
        <div className='error-msg__icon'/>
        <h2 className='error-msg__header-title'>Ошибка</h2>
        <button className='error-msg__close-btn' type='button' onClick={onClose}/>
      </div>
      <p className='error-msg__text'>{message}</p>
    </section>
  );
}

export default ErrorMessage;

