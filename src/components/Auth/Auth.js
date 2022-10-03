import './Auth.css';
import Logo from "../Logo/Logo";
import {Link} from "react-router-dom";
import {useFormWithValidation} from "../../utils/forms";

function Auth({isRegister, onSubmit}) {
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

  const {values, handleChange, errors, isValid, resetForm} = useFormWithValidation();

  const handleNameInput = evt => {
    const target = evt.target;
    if (target.validity.patternMismatch) {
      target.setCustomValidity('Разрешены лишь русские/латинские буквы, пробел или дефис');
    } else {
      target.setCustomValidity('');
    }
  }

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
            <input className={`auth__input ${errors.name ? 'auth__input_errored' : ''}`} name='name' type='text' required minLength='2' maxLength='30' pattern='^[a-zA-Zа-яА-ЯёЁ \-]+$' onChange={handleChange} onInput={handleNameInput}/>
            <span className='auth__error'>{errors.name || ''}</span>
          </>
        }
        <label className='auth__label'>E-mail</label>
        <input className={`auth__input ${errors.email ? 'auth__input_errored' : ''}`} name='email' type='email' required onChange={handleChange}/>
        <span className='auth__error'>{errors.email || ''}</span>

        <label className='auth__label'>Пароль</label>
        <input className={`auth__input ${errors.password ? 'auth__input_errored' : ''}`} name='password' type='password' required onChange={handleChange}/>
        <span className='auth__error'>{errors.password || ''}</span>

        <button className={`auth__submit-btn ${!isRegister ? 'auth__submit-btn_place_login' : ''} ${isValid ? '' : 'auth__submit-btn_disabled'}`} type='submit' disabled={!isValid}>{params.buttonName}</button>
      </form>
      <div className='auth__wrapper'>
        <p className='auth__answer'>{params.answer}</p>
        <Link className="auth__link" to={params.linkUrl}>{params.linkName}</Link>
      </div>
    </section>
  );
}

export default Auth;
