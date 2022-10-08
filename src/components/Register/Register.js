import Auth from "../Auth/Auth";

function Register({onRegister, isLoading}) {
  return (
    <Auth isRegister={true} isLoading={isLoading} onSubmit={onRegister}/>
  );
}

export default Register;
