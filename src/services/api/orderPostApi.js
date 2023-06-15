import { apiUrl } from "./getIngredientsData";

const checkReponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка 1: ${res} ${res.status} ${res.statusText}`);
};

const orderPostApi = (idArr) => {
  return fetch(`${apiUrl}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'ingredients': idArr
    })
  })
  .then((res) => checkReponse(res))
}

export {orderPostApi}