import './App.css';
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import NotFound from "../NotFound/NotFound";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import {Route, Switch, useHistory} from "react-router-dom";
import Header from "../Header/Header";
import {useEffect, useState} from "react";
import Menu from "../Menu/Menu";
import auth from "../../utils/Auth";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import mainApi from "../../utils/MainApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Loading from "../Loading/Loading";

function App() {
  const history = useHistory();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [currentUser, setCurrentUser] = useState({});
  const [isTokenChecked, setIsTokenChecked] = useState(false);

  const [notification, setNotification] = useState({
    content: '',
    isSuccessful: false
  });

  const openMenu = () => {
    setIsMenuVisible(true);
  }

  const closeMenu = () => {
    setIsMenuVisible(false);
  }

  const closeNotification = () => {
    setNotification({...notification, content: ''});
  }

  const handleRegister = async ({name, email, password}) => {
    try {
      await auth.register(name, email, password);
      await handleLogin({email, password});
    } catch (err) {
      setNotification({content: err.message, isSuccessful: false});
    }
  }

  const handleLogin = async ({email, password}) => {
    try {
      const token = await auth.authorize(email, password);
      localStorage.setItem('token', token);
      setIsLoggedIn(true);
      history.push("/movies");
    } catch (err) {
      setNotification({content: err.message, isSuccessful: false});
    }
  }

  const handleUserUpdate = async ({name, email}) => {
    try {
      const user = await mainApi.updateUser(name, email);
      setCurrentUser(user);
      setNotification({content: "Данные пользователя успешно обновлены", isSuccessful: true});
    } catch (err) {
      setNotification({content: err.message, isSuccessful: false});
    }
  }

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  }

  useEffect(() => {
    async function fetchData(token) {
      try {
        setIsTokenChecked(false)
        await auth.checkToken(token);
        setIsLoggedIn(true);
      } catch (err) {
        // если токен не найден, просрочен, все, что угодно - ничего не делаем - пусть пользователь логинится заново
      } finally {
        setIsTokenChecked(true)
      }
    }

    fetchData(localStorage.getItem('token'));
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (isLoggedIn) {
        try {
          const user = await mainApi.getUser();
          setCurrentUser(user);
        } catch (err) {
          setCurrentUser({name: 'John Dow', email: 'johndow@johndow.com'});
        }
      }
    }
    fetchData();
  }, [isLoggedIn]);

  if (!isTokenChecked) {
    return (<Loading/>);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Route exact path="/(movies|saved-movies|profile|)">
          <Header isLoggedIn={isLoggedIn} onMenuOpen={openMenu} onMenuClose={closeMenu}/>
        </Route>
        <Switch>
          <Route exact path="/signup" >
            <Register onRegister={handleRegister} notification={notification} onNotificationClose={closeNotification}/>
          </Route>
          <Route exact path="/signin">
            <Login onLogin={handleLogin} notification={notification} onNotificationClose={closeNotification}/>
          </Route>
          <ProtectedRoute path="/profile" isLoggedIn={isLoggedIn} onSignOut={handleSignOut} onUserUpdate={handleUserUpdate} notification={notification} onNotificationClose={closeNotification} component={Profile}/>
          <ProtectedRoute path="/movies" isLoggedIn={isLoggedIn} notification={notification} onNotificationClose={closeNotification} setNotification={setNotification} component={Movies}/>
          <ProtectedRoute path="/saved-movies" isLoggedIn={isLoggedIn} notification={notification} onNotificationClose={closeNotification} setNotification={setNotification} component={SavedMovies}/>
          <Route exact path="/">
            <Main/>
          </Route>
          <Route path="*">
            <NotFound/>
          </Route>
        </Switch>
        <Route exact path="/(movies|saved-movies|)">
          <Footer/>
        </Route>
        <Menu isMenuVisible={isMenuVisible} onMenuClose={closeMenu}/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
