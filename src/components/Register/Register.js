import Auth from "../Auth/Auth";

function Register({onRegister, notification, onNotificationClose}) {
  return (
    <Auth isRegister={true} onSubmit={onRegister} notification={notification} onNotificationClose={onNotificationClose}/>
  );
}

export default Register;
