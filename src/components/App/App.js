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

function App() {
  const history = useHistory();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const openMenu = () => {
    setIsMenuVisible(true);
  }

  const closeMenu = () => {
    setIsMenuVisible(false);
  }

  const closeErrorMessage = () => {
    setErrorMessage('');
  }

  const login = () => {
    setIsLoggedIn(true);
    history.push("/movies");
  }

  const handleRegister = async ({name, email, password}) => {
    try {
      await auth.register(name, email, password);
      await handleLogin({email, password});
    } catch (err) {
      setErrorMessage(err.message);
    }
  }

  const handleLogin = async ({email, password}) => {
    try {
      const token = await auth.authorize(email, password);
      localStorage.setItem('token', token);
      login();
    } catch (err) {
      setErrorMessage(err.message);
    }
  }

  const handleUserUpdate = async ({name, email}) => {
    try {
      const user = await mainApi.updateUser(name, email);
      setCurrentUser(user);
    } catch (err) {
      console.log(err.message);
    }
  }

  const handleSignOut = () => {
    localStorage.removeItem('token');
    history.push('/sign-in');
    setIsLoggedIn(false);
  }

  useEffect(() => {
    async function fetchData(token) {
      try {
        await auth.checkToken(token);
        login();
      } catch (err) {
        // если токен не найден, просрочен, все, что угодно - ничего не делаем - пусть пользователь логинится заново
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
          console.log(err.message)
        }
      }
    }
    fetchData();
  }, [isLoggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Route exact path="/(movies|saved-movies|profile|)">
          <Header isLoggedIn={isLoggedIn} onMenuOpen={openMenu} onMenuClose={closeMenu}/>
        </Route>
        <Switch>
          <Route exact path="/signup" >
            <Register onRegister={handleRegister} errorMessage={errorMessage} onErrorMsgClose={closeErrorMessage}/>
          </Route>
          <Route exact path="/signin">
            <Login onLogin={handleLogin} errorMessage={errorMessage} onErrorMsgClose={closeErrorMessage}/>
          </Route>
          <Route exact path="/profile">
            <Profile onSignOut={handleSignOut} onUserUpdate={handleUserUpdate}/>
          </Route>
          <Route exact path="/movies">
            <Movies/>
          </Route>
          <Route exact path="/saved-movies">
            <SavedMovies/>
          </Route>
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
