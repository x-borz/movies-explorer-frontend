import './App.css';
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import NotFound from "../NotFound/NotFound";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import {Route, Switch, useHistory, useLocation} from "react-router-dom";
import Header from "../Header/Header";
import {useEffect, useState} from "react";
import Menu from "../Menu/Menu";
import auth from "../../utils/Auth";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import mainApi from "../../utils/MainApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Loading from "../Loading/Loading";
import NotificationContext from "../../contexts/NotificationContext";

function App() {
  const history = useHistory();
  const location = useLocation();

  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isTokenChecked, setIsTokenChecked] = useState(false);
  const [notification, setNotification] = useState({
    content: '',
    isSuccessful: false
  });

  const [savedMovies, setSavedMovies] = useState([]);

  const [localStorageSearch, setLocalStorageSearch] = useState('');
  const [localStorageMovieIndex, setLocalStorageMovieIndex] = useState('');
  const [localStorageSearchSaved, setLocalStorageSearchSaved] = useState('');

  const showFailedNotification = (message) => {
    setNotification({content: message, isSuccessful: false});
  }

  const showSuccessfulNotification = (message) => {
    setNotification({content: message, isSuccessful: true});
  }

  const closeNotification = () => {
    setNotification({...notification, content: ''});
  }

  const openMenu = () => {
    setIsMenuVisible(true);
  }

  const closeMenu = () => {
    setIsMenuVisible(false);
  }

  const handleRegister = async ({name, email, password}) => {
    try {
      await auth.register(name, email, password);
      await handleLogin({email, password});
    } catch (err) {
      showFailedNotification(err.message);
    }
  }

  const handleLogin = async ({email, password}) => {
    try {
      const token = await auth.authorize(email, password);
      localStorage.setItem('token', token);
      setIsLoggedIn(true);
      history.push("/movies");
    } catch (err) {
      showFailedNotification(err.message);
    }
  }

  const handleUserUpdate = async ({name, email}) => {
    try {
      const user = await mainApi.updateUser(name, email);

      if (currentUser.email !== user.email) {
        const newLocalStorageSearch = `${user.email}-search`;
        const newLocalStorageMovieIndex = `${user.email}-movieIndex`;
        const newLocalStorageSearchSaved = `${user.email}-searchSaved`;

        localStorage.setItem(newLocalStorageSearch, localStorage.getItem(localStorageSearch));
        localStorage.setItem(newLocalStorageMovieIndex, localStorage.getItem(localStorageMovieIndex));
        localStorage.setItem(newLocalStorageSearchSaved, localStorage.getItem(localStorageSearchSaved));

        setLocalStorageSearch(newLocalStorageSearch);
        setLocalStorageMovieIndex(newLocalStorageMovieIndex);
        setLocalStorageSearchSaved(newLocalStorageSearchSaved);
      }

      setCurrentUser(user);

      showSuccessfulNotification("Данные пользователя успешно обновлены");
    } catch (err) {
      showFailedNotification(err.message);
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
          setLocalStorageSearch(`${user.email}-search`);
          setLocalStorageMovieIndex(`${user.email}-movieIndex`);
          setLocalStorageSearchSaved(`${user.email}-searchSaved`);
        } catch (err) {
          setCurrentUser({name: 'John Dow', email: 'johndow@johndow.com'});
          showFailedNotification('Ошибка загрузки имени и email пользователя. ' + err.message);
        }
      }
    }
    fetchData();
  }, [isLoggedIn]);

  // подгружаем избранные фильмы пользователя один раз при монтировании компонента
  useEffect(() => {
    async function fetchData() {
      if (isLoggedIn) {
        try {
          const movies = await mainApi.getAllMovies();
          setSavedMovies(movies);
        } catch (err) {
          showFailedNotification('Ошибка загрузки массива избранных фильмов пользователя. ' + err.message);
        }
      }
    }

    fetchData();
  }, [isLoggedIn]);

  useEffect(() => {
    const title = 'Дипломный проект';
    let postfix = '';
    switch (location.pathname) {
      case '/':
        postfix += ' - Главная страница';
        break;
      case '/movies':
        postfix += ' - Фильмы';
        break;
      case '/saved-movies':
        postfix += ' - Сохранённые фильмы';
        break;
      case '/profile':
        postfix += ' - Профиль';
        break;
      case '/signup':
        postfix += ' - Регистрация';
        break;
      case '/signin':
        postfix += ' - Авторизация';
        break;
    }

    document.title = title + postfix;
  }, [location]);

  if (!isTokenChecked) {
    return (<Loading/>);
  }

  return (
    <CurrentUserContext.Provider value={{currentUser, localStorageSearch, localStorageMovieIndex, localStorageSearchSaved}}>
      <NotificationContext.Provider value={{notification, showFailedNotification, showSuccessfulNotification, closeNotification}}>
        <div className="page">
          <Route exact path="/(movies|saved-movies|profile|)">
            <Header isLoggedIn={isLoggedIn} onMenuOpen={openMenu} onMenuClose={closeMenu}/>
          </Route>
          <Switch>
            <Route exact path="/signup" >
              <Register onRegister={handleRegister}/>
            </Route>
            <Route exact path="/signin">
              <Login onLogin={handleLogin}/>
            </Route>
            <ProtectedRoute exact path="/profile" isLoggedIn={isLoggedIn} onSignOut={handleSignOut} onUserUpdate={handleUserUpdate} component={Profile}/>
            <ProtectedRoute exact path="/movies" isLoggedIn={isLoggedIn} savedMovies={savedMovies} setSavedMovies={setSavedMovies} component={Movies}/>
            <ProtectedRoute exact path="/saved-movies" isLoggedIn={isLoggedIn} savedMovies={savedMovies} setSavedMovies={setSavedMovies} component={SavedMovies}/>
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
      </NotificationContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
