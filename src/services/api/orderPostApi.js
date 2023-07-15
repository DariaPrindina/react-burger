import { apiUrl, checkResponse } from "./getIngredientsData";

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
  .then((res) => checkResponse(res))
}

export {orderPostApi}