const postApi = 'https://norma.nomoreparties.space/api/orders';

const orderPostApi = (orderIngredients, setOrder) => {
  fetch(postApi, {
    method: 'POST',
    headers: {
      "Content-type": 'application/json'
    },
    body: JSON.stringify(orderIngredients)
  })
  .then((res) => {
    if (res.ok){
      return res.json();
    }
    return Promise.reject(`Ошибка 1: ${res} ${res.status}`)    
  })
  .then((res) => {
    setOrder(res)
  })
  .catch((err) => {
    console.log(err)
  })
}

export {orderPostApi}