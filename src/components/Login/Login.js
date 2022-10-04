import Auth from "../Auth/Auth";

function Login({onLogin, errorMessage, onErrorMsgClose}) {
  return (
    <Auth isRegister={false} onSubmit={onLogin} errorMessage={errorMessage} onErrorMsgClose={onErrorMsgClose}/>
  );
}

export default Login;
