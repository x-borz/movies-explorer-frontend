import './Profile.css';
import {Link} from "react-router-dom";
import {useFormWithValidation} from "../../utils/forms";
import {handleNameInput} from "../../utils/utils";
import {useContext, useEffect} from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Profile({onSignOut, onUserUpdate}) {
  const {name, email} = useContext(CurrentUserContext);
  const {values, handleChange, errors, isValid, resetForm} = useFormWithValidation();

  const handleProfileEdition = evt => {
    evt.preventDefault();
    onUserUpdate(values);
  }

  useEffect(() => {
    resetForm({name, email}, {}, false);
  }, [name, email]);

  const isFormValid = isValid && (values.name !== name || values.email !== email);

  return (
    <section className='profile page__section'>
      <h1 className='profile__greeting'>Привет, {name}!</h1>
      <form className='profile__form' onSubmit={handleProfileEdition}>
        <div className='input-group'>
          <label className='profile__label' htmlFor='name'>Имя</label>
          <input className={`profile__input ${errors.name ? 'profile__input_errored' : ''}`} id='name' name='name' type='text' required minLength='2' maxLength='30' pattern='^[a-zA-Zа-яА-ЯёЁ \-]+$' defaultValue={values.name} onChange={handleChange} onInput={handleNameInput}/>
          <span className='profile__error'>{errors.name || ''}</span>
        </div>
        <div className='input-group'>
          <label className='profile__label' htmlFor='email'>E-mail</label>
          <input className={`profile__input profile__input_unbordered ${errors.email ? 'profile__input_errored' : ''}`} id='email' name='email' type='email' required defaultValue={values.email} onChange={handleChange}/>
          <span className='profile__error'>{errors.email || ''}</span>
        </div>
        <button className={`profile__edit-btn ${!isFormValid ? 'profile__edit-btn_disabled' : ''}`} type='submit' disabled={!isFormValid}>Редактировать</button>
      </form>
      <Link className='profile__link' to='/' onClick={onSignOut}>Выйти из аккаунта</Link>
    </section>
  );
}

export default Profile;
