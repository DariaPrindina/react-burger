export const apiUrl = 'https://norma.nomoreparties.space/api'

export const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const getIngredientsData = async () => {
  const res = await fetch(`${apiUrl}/ingredients`);
  return checkResponse(res)
}

export {getIngredientsData}