import AbstractMovies from "../AbstractMovies/AbstractMovies";
import img1 from "../../images/temp/33-words-about-design.png";
import img2 from "../../images/temp/34-words-about-design.png";
import img3 from "../../images/temp/35-words-about-design.png";

function SavedMovies(props) {
  const isSavedMoviesPage = true;
  const movies = [
    {name: '33 слова о дизайне', duration: '1ч 47м', img: img1, isSavedMoviesPage},
    {name: '34 слова о дизайне', duration: '1ч 47м', img: img2, isSavedMoviesPage},
    {name: '35 слов о дизайне', duration: '1ч 47м', img: img3, isSavedMoviesPage},
  ];

  return (
    <AbstractMovies isSavedMoviesPage={isSavedMoviesPage} movies={movies}/>
  );
}

export default SavedMovies;
