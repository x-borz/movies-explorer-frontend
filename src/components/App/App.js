import './App.css';
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import NotFound from "../NotFound/NotFound";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import {Redirect, Route, Switch, useHistory, useLocation} from "react-router-dom";
import Header from "../Header/Header";
import {useEffect, useState} from "react";
import Menu from "../Menu/Menu";
import auth from "../../utils/Auth";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import mainApi from "../../utils/MainApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Loading from "../Loading/Loading";
import NotificationContext from "../../contexts/NotificationContext";
import {LOCAL_STORAGE_ALL_MOVIES, LOCAL_STORAGE_TOKEN} from "../../utils/constants";

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

  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
      await auth.register(name, email, password);
      await handleLogin({email, password});
    } catch (err) {
      showFailedNotification(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  const handleLogin = async ({email, password}) => {
    try {
      setIsLoading(true);
      const token = await auth.authorize(email, password);
      localStorage.setItem(LOCAL_STORAGE_TOKEN, token);
      setIsLoggedIn(true);
      history.push("/movies");
    } catch (err) {
      showFailedNotification(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  const handleUserUpdate = async ({name, email}) => {
    try {
      setIsLoading(true);

      const user = await mainApi.updateUser(name, email);

      if (currentUser.email !== user.email) {
        const newLocalStorageSearch = `${user.email}-search`;
        const newLocalStorageMovieIndex = `${user.email}-movieIndex`;

        localStorage.setItem(newLocalStorageSearch, localStorage.getItem(localStorageSearch));
        localStorage.setItem(newLocalStorageMovieIndex, localStorage.getItem(localStorageMovieIndex));

        setLocalStorageSearch(newLocalStorageSearch);
        setLocalStorageMovieIndex(newLocalStorageMovieIndex);
      }

      setCurrentUser(user);

      showSuccessfulNotification("???????????? ???????????????????????? ?????????????? ??????????????????");
    } catch (err) {
      showFailedNotification(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSignOut = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_ALL_MOVIES);
    localStorage.removeItem(localStorageSearch);
    localStorage.removeItem(localStorageMovieIndex);
    setCurrentUser(null);
    setSavedMovies([]);
    setIsLoggedIn(false);
  }

  useEffect(() => {
    async function fetchData(token) {
      try {
        setIsTokenChecked(false)
        await auth.checkToken(token);
        setIsLoggedIn(true);
      } catch (err) {
        // ???????? ?????????? ???? ????????????, ??????????????????, ??????, ?????? ???????????? - ???????????? ???? ???????????? - ?????????? ???????????????????????? ?????????????????? ????????????
      } finally {
        setIsTokenChecked(true)
      }
    }

    fetchData(localStorage.getItem(LOCAL_STORAGE_TOKEN));
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (isLoggedIn) {
        try {
          const user = await mainApi.getUser();
          setCurrentUser(user);
          setLocalStorageSearch(`${user.email}-search`);
          setLocalStorageMovieIndex(`${user.email}-movieIndex`);
        } catch (err) {
          setCurrentUser({name: 'John Dow', email: 'johndow@johndow.com'});
          showFailedNotification('???????????? ???????????????? ?????????? ?? email ????????????????????????. ' + err.message);
        }
      }
    }
    fetchData();
  }, [isLoggedIn]);

  // ???????????????????? ?????????????????? ???????????? ????????????????????????, ?????????? ???????????????????????? ??????????????????????
  useEffect(() => {
    async function fetchData() {
      if (isLoggedIn) {
        try {
          const movies = await mainApi.getAllMovies();
          setSavedMovies(movies);
        } catch (err) {
          showFailedNotification('???????????? ???????????????? ?????????????? ?????????????????? ?????????????? ????????????????????????. ' + err.message);
        }
      }
    }

    fetchData();
  }, [isLoggedIn]);

  useEffect(() => {
    const title = '?????????????????? ????????????';
    let postfix = '';
    switch (location.pathname) {
      case '/':
        postfix += ' - ?????????????? ????????????????';
        break;
      case '/movies':
        postfix += ' - ????????????';
        break;
      case '/saved-movies':
        postfix += ' - ?????????????????????? ????????????';
        break;
      case '/profile':
        postfix += ' - ??????????????';
        break;
      case '/signup':
        postfix += ' - ??????????????????????';
        break;
      case '/signin':
        postfix += ' - ??????????????????????';
        break;
    }

    document.title = title + postfix;
  }, [location]);

  if (!isTokenChecked) {
    return (<Loading/>);
  }

  return (
    <CurrentUserContext.Provider value={{currentUser, localStorageSearch, localStorageMovieIndex}}>
      <NotificationContext.Provider value={{notification, showFailedNotification, showSuccessfulNotification, closeNotification}}>
        <div className="page">
          <Route exact path="/(movies|saved-movies|profile|)">
            <Header isLoggedIn={isLoggedIn} onMenuOpen={openMenu} onMenuClose={closeMenu}/>
          </Route>
          <Switch>
            <Route exact path="/signup" >
              {isLoggedIn
                ? <Redirect to="/"/>
                : <Register onRegister={handleRegister} isLoading={isLoading}/>
              };
            </Route>
            <Route exact path="/signin">
              {isLoggedIn
                ? <Redirect to="/"/>
                : <Login onLogin={handleLogin} isLoading={isLoading}/>
              }
            </Route>
            <ProtectedRoute exact path="/profile" isLoggedIn={isLoggedIn} isLoading={isLoading} onSignOut={handleSignOut} onUserUpdate={handleUserUpdate} component={Profile}/>
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
