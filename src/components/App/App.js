import './App.css';
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import NotFound from "../NotFound/NotFound";
import Auth from "../Auth/Auth";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";

function App() {
  return (
    <div className="page">
      {/*<Main/>*/}
      {/*<Movies/>*/}
      {/*<SavedMovies/>*/}
      {/*<Footer/>*/}
      {/*<NotFound/>*/}
      {/*<Register/>*/}
      {/*<Login/>*/}
      <Profile/>
    </div>
  );
}

export default App;
