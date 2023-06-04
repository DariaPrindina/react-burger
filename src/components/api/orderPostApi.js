const postApi = 'https://norma.nomoreparties.space/api/orders';

const orderPostApi = (orderIngredients, setOrder) => {
  return fetch(postApi, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "ingredients": orderIngredients
  })
  })
  .then((res) => {
    if (res.ok){
      return res.json();
    }
    return Promise.reject(`Ошибка 1: ${res} ${res.status}`)    
  })
  .then((res) => {
    setOrder(res.order.number.toString())
  })
  .catch((err) => {
    console.log(err)
  })
}

export {orderPostApi}