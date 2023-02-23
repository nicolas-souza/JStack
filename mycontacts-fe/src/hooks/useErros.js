import { useState } from 'react';

export default function useErros() {
  const [errors, setErros] = useState([]);

  function setError({ field, message }) {
    const errorAlreadyExists = errors.find((error) => error.field === field);

    if (errorAlreadyExists) {
      return;
    }

    setErros((prevState) => [
      ...prevState,
      { field, message },
    ]);
  }

  function removeError(fieldName) {
    setErros((prevState) => prevState.filter(
      (error) => error.field !== fieldName,
    ));
  }

  function getErrorMessageByFieldName(fildName) {
    return errors.find((error) => error.field === fildName)?.message;
  }

  return {
    errors,
    setError,
    removeError,
    getErrorMessageByFieldName,
  };
}
