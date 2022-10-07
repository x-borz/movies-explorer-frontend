import Auth from "../Auth/Auth";

function Login({onLogin, isLoading}) {
  return (
    <Auth isRegister={false} isLoading={isLoading} onSubmit={onLogin}/>
  );
}

export default Login;
