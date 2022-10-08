import {
  FIVE_MOVIES_BY_CLICK, MINUTES_IN_HOUR,
  RESOLUTION_1280_PX, RESOLUTION_768_PX,
  SHORT_METER_MAX_LIMIT,
  THREE_MOVIES_BY_CLICK,
  TWO_MOVIES_BY_CLICK
} from "./constants";

export const handleNameInput = evt => {
  const target = evt.target;
  if (target.validity.patternMismatch) {
    target.setCustomValidity('Разрешены лишь русские/латинские буквы, пробел или дефис');
  } else {
    target.setCustomValidity('');
  }
}

export const handleEmailInput = evt => {
  const target = evt.target;
  if (target.validity.patternMismatch) {
    target.setCustomValidity('Введите правильный адрес электронной почты');
  } else {
    target.setCustomValidity('');
  }
}

export const formatDuration = (durationInMinutes) => {
  let result = '';

  const hours = Math.floor(durationInMinutes / MINUTES_IN_HOUR);
  const minutes = durationInMinutes % MINUTES_IN_HOUR;

  if (hours > 0) {
     result += hours + 'ч ';
  }

  result += minutes + 'м';

  return result;
}

export const getIndexStep = () => {
  if (window.innerWidth >= RESOLUTION_1280_PX) {
    return THREE_MOVIES_BY_CLICK;
  } else if (window.innerWidth >= RESOLUTION_768_PX) {
    return TWO_MOVIES_BY_CLICK;
  } else {
    return FIVE_MOVIES_BY_CLICK;
  }
}

export const filterMovies = (movies, searchString, isChecked) => {
  const search = searchString.toLowerCase();
  return movies.filter(movie => {
    return (isChecked ? movie.duration <= SHORT_METER_MAX_LIMIT : true) && (
        movie.nameRU.toLowerCase().includes(search) ||
        movie.nameEN.toLowerCase().includes(search) ||
        movie.country.toLowerCase().includes(search) ||
        movie.director.toLowerCase().includes(search) ||
        movie.description.toLowerCase().includes(search)
      )
  });
}
