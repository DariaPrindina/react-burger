const apiUrl = 'https://norma.nomoreparties.space/api/ingredients'

const getIngredientsData = (setIngredients) => {
  fetch(apiUrl)
  .then((res) => {
    if (res.ok){
      return res.json();
    }
    return Promise.reject(`Ошибка 1: ${res} ${res.status}`)    
  })
  .then((res) => {
  setIngredients(res.data)
  })
  .catch((err) => {
    console.log(err)
  })
}

export {getIngredientsData}