export const apiUrl = 'https://norma.nomoreparties.space/api'

const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const getIngredientsData = async () => {
  const res = await fetch(`${apiUrl}/ingredients`);
  return checkReponse(res);
}

export {getIngredientsData}