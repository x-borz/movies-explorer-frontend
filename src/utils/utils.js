export const handleNameInput = evt => {
  const target = evt.target;
  if (target.validity.patternMismatch) {
    target.setCustomValidity('Разрешены лишь русские/латинские буквы, пробел или дефис');
  } else {
    target.setCustomValidity('');
  }
}
