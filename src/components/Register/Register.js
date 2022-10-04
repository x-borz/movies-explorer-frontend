import Auth from "../Auth/Auth";

function Register({onRegister, errorMessage, onErrorMsgClose}) {
  return (
    <Auth isRegister={true} onSubmit={onRegister} errorMessage={errorMessage} onErrorMsgClose={onErrorMsgClose}/>
  );
}

export default Register;
