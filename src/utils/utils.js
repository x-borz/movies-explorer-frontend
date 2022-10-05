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

  const hours = Math.floor(durationInMinutes / 60);
  const minutes = durationInMinutes % 60;

  if (hours > 0) {
     result += hours + 'ч ';
  }

  result += minutes + 'м';

  return result;
}
