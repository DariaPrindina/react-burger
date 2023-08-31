import { TOrderPostRes } from "../types/data";
import { apiUrl, checkResponse } from "./getIngredientsData";

const orderPostApi = (idArr: string[]) => {
  return fetch(`${apiUrl}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('accessToken')

    },
    body: JSON.stringify({
      'ingredients': idArr
    })
  })
  .then((res) => checkResponse<TOrderPostRes>(res))
}

export {orderPostApi}