import { TIngredientsDataRes } from "../types/data";

export const apiUrl = 'https://norma.nomoreparties.space/api'

export const checkResponse = <T>(res: Response): Promise<T> => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const getIngredientsData = async () => {
  const res = await fetch(`${apiUrl}/ingredients`);
  return checkResponse<TIngredientsDataRes>(res)
}

export {getIngredientsData}