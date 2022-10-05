import Auth from "../Auth/Auth";

function Register({onRegister}) {
  return (
    <Auth isRegister={true} onSubmit={onRegister}/>
  );
}

export default Register;
