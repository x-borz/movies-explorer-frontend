import './App.css';
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import NotFound from "../NotFound/NotFound";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import {Route, Switch} from "react-router-dom";

function App() {
  return (
    <div className="page">
      <Switch>
        <Route exact path="/signup">
          <Register/>
        </Route>
        <Route exact path="/signin">
          <Login/>
        </Route>
        <Route exact path="/profile">
          <Profile/>
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
    </div>
  );
}

export default App;
