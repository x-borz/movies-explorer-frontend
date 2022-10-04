import Auth from "../Auth/Auth";

function Login({onLogin, notification, onNotificationClose}) {
  return (
    <Auth isRegister={false} onSubmit={onLogin} notification={notification} onNotificationClose={onNotificationClose}/>
  );
}

export default Login;
