const postApi = 'https://norma.nomoreparties.space/api/orders';

const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(`Ошибка 1: ${err} ${err.status}`));
};

const orderPostApi = async (idArr) => {
  const res = await fetch(postApi, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "ingredients": idArr
    })
  });
  return checkReponse(res);
}

export {orderPostApi}