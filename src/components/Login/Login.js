import Auth from "../Auth/Auth";

function Login({onLogin}) {
  return (
    <Auth isRegister={false} onSubmit={onLogin}/>
  );
}

export default Login;
