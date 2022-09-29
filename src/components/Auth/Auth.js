import './Auth.css';
import Logo from "../Logo/Logo";

function Auth({isRegister}) {
  const params = isRegister ?
    {
      title: 'Добро пожаловать!',
      buttonName: 'Зарегистрироваться',
      linkUrl: '#',
      linkName: 'Войти',
      answer: 'Уже зарегистрированы?'
    } :
    {
      title: 'Рады видеть!',
      buttonName: 'Войти',
      linkUrl: '#',
      linkName: 'Регистрация',
      answer: 'Ещё не зарегистрированы?'
    }

  return (
    <section className='auth page__section'>
      <Logo modifier={'auth__logo'}/>
      <h1 className='auth__title'>{params.title}</h1>
      <form className='auth__form'>
        {
          isRegister &&
          <>
            <label className='auth__label'>Имя</label>
            <input className='auth__input' type='text'/>
            <span className='auth__error'></span>
          </>
        }
        <label className='auth__label'>E-mail</label>
        <input className='auth__input' type='text'/>
        <span className='auth__error'></span>

        <label className='auth__label'>Пароль</label>
        <input className='auth__input' type='password'/>
        <span className='auth__error'></span>

        <button className={`auth__submit_btn ${!isRegister ? 'auth__submit_btn_place_login' : ''}`} type='submit'>{params.buttonName}</button>
      </form>
      <div className='auth__wrapper'>
        <p className='auth__answer'>{params.answer}</p>
        <a className='auth__link' href={params.linkUrl}>{params.linkName}</a>
      </div>
    </section>
  );
}

export default Auth;
