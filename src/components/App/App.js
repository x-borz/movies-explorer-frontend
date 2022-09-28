import './App.css';
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";

function App() {
  return (
    <div className="page">
      {/*<Main/>*/}
      <Movies/>
      {/*<SavedMovies/>*/}
      <Footer/>
    </div>
  );
}

export default App;
