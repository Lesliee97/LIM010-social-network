const validarEmail = (correo) => {
  const correoCorrecto = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  correoCorrecto.test(correo);
};
const savePost = (arr, ele) => {
  const resultado = [...arr];
  resultado.push(ele);
  return resultado;
};
const eliminarObj = (arr, indice) =>{
  const newArray = [...arr]
  newArray.splice(indice, 1);
  console.log(newArray)
  return newArray;
};
const editPost = (arr, indice, element) => {
  const result = [...arr];
  result[indice] = {...result[indice]};
  result[indice].text = element[indice].value;
  return result;
};

window.validarEmail = validarEmail;
window.savePost = savePost;
window.eliminarObj = eliminarObj;
window.editPost = editPost;