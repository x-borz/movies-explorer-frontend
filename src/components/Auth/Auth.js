import './Auth.css';
import Logo from "../Logo/Logo";
import {Link} from "react-router-dom";
import {useFormWithValidation} from "../Forms/Forms";
import {handleEmailInput, handleNameInput} from "../../utils/utils";
import Notification from "../Notification/Notification";

function Auth({isRegister, isLoading, onSubmit}) {
  const params = isRegister ?
    {
      title: 'Добро пожаловать!',
      buttonName: 'Зарегистрироваться',
      linkUrl: '/signin',
      linkName: 'Войти',
      answer: 'Уже зарегистрированы?'
    } :
    {
      title: 'Рады видеть!',
      buttonName: 'Войти',
      linkUrl: '/signup',
      linkName: 'Регистрация',
      answer: 'Ещё не зарегистрированы?'
    }

  const {values, handleChange, errors, isValid} = useFormWithValidation();

  const submit = evt => {
    evt.preventDefault();
    onSubmit(values);
  }

  return (
    <section className='auth page__section'>
      <Logo modifier={'auth'}/>
      <h1 className='auth__title'>{params.title}</h1>
      <form className='auth__form' onSubmit={submit}>
        {
          isRegister &&
          <>
            <label className='auth__label'>Имя</label>
            <input className={`auth__input ${errors.name ? 'auth__input_errored' : ''}`} name='name' type='text' required minLength='2' maxLength='30' pattern='^[a-zA-Zа-яА-ЯёЁ \-]+$' onChange={handleChange} onInput={handleNameInput} disabled={isLoading}/>
            <span className='auth__error'>{errors.name || ''}</span>
          </>
        }
        <label className='auth__label'>E-mail</label>
        <input className={`auth__input ${errors.email ? 'auth__input_errored' : ''}`} name='email' type='text' pattern='^[\w!#$%&’*+/=?`{|}~^-]+(?:\.[\w!#$%&’*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$' required onChange={handleChange} onInput={handleEmailInput} disabled={isLoading}/>
        <span className='auth__error'>{errors.email || ''}</span>

        <label className='auth__label'>Пароль</label>
        <input className={`auth__input ${errors.password ? 'auth__input_errored' : ''}`} name='password' type='password' required onChange={handleChange} disabled={isLoading}/>
        <span className='auth__error'>{errors.password || ''}</span>

        <button className={`auth__submit-btn ${!isRegister ? 'auth__submit-btn_place_login' : ''} ${!isValid || isLoading ? 'auth__submit-btn_disabled' : ''}`} type='submit' disabled={!isValid || isLoading}>
          {isLoading ? 'Загрузка...' : params.buttonName}
        </button>

        <Notification modifier='auth'/>
      </form>
      <div className='auth__wrapper'>
        <p className='auth__answer'>{params.answer}</p>
        <Link className="auth__link" to={params.linkUrl}>{params.linkName}</Link>
      </div>
    </section>
  );
}

export default Auth;
