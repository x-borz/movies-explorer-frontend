import AbstractMovies from "../AbstractMovies/AbstractMovies";
import img1 from "../../images/temp/33-words-about-design.png";
import img2 from "../../images/temp/34-words-about-design.png";
import img3 from "../../images/temp/35-words-about-design.png";
import img4 from "../../images/temp/36-words-about-design.png";
import moviesApi from "../../utils/MoviesApi";

function Movies(props) {
  const isSavedMoviesPage = false;
  const movies = [
    {name: '33 слова о дизайне', duration: '1ч 47м', img: img1, isSavedMoviesPage, isLiked: false},
    {name: '34 слова о дизайне', duration: '1ч 47м', img: img2, isSavedMoviesPage, isLiked: true},
    {name: '35 слов о дизайне', duration: '1ч 47м', img: img3, isSavedMoviesPage, isLiked: false},
    {name: '36 слов о дизайне', duration: '1ч 47м', img: img4, isSavedMoviesPage, isLiked: true},
    {name: '33 слова о дизайне', duration: '1ч 47м', img: img1, isSavedMoviesPage, isLiked: false},
    {name: '34 слова о дизайне', duration: '1ч 47м', img: img2, isSavedMoviesPage, isLiked: true},
    {name: '35 слов о дизайне', duration: '1ч 47м', img: img3, isSavedMoviesPage, isLiked: false},
    {name: '36 слов о дизайне', duration: '1ч 47м', img: img4, isSavedMoviesPage, isLiked: true},
    {name: '33 слова о дизайне', duration: '1ч 47м', img: img1, isSavedMoviesPage, isLiked: false},
    {name: '34 слова о дизайне', duration: '1ч 47м', img: img2, isSavedMoviesPage, isLiked: true}
  ];

  const handleSubmit = async () => {
    try {
      const movies = await moviesApi.getMovies();
      console.log(movies);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AbstractMovies isSavedMoviesPage={isSavedMoviesPage} movies={movies} onSubmit={handleSubmit}/>
  );
}

export default Movies;
