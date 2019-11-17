/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
const loggin = document.getElementById('loggin');
const linkregistro = document.getElementById('linkregistro');
const registro = document.getElementById('registro');
const btnRegister = document.getElementById('register');
const inputFile = document.getElementById('input-file');
const mailRegisterInput = document.getElementById('register-email');
const inputWritePost = document.getElementById('post');
const printerPost = document.getElementById('printer-post');
const texto = document.getElementsByName('texto');
const sectionPost = document.getElementById('posts');
const preview = document.getElementById('posting-img');
const arrPost = [];

// linkregistro.addEventListener('click', () => {
//   loggin.classList.add('hide');
//   registro.classList.remove('hide');
// });

// btnRegister.addEventListener('click', () => {
//   validarEmail(mailRegisterInput.value);
// });

// addEventListener
inputWritePost.addEventListener('keyup', () => {
  const numCaracteres = inputWritePost.value.length;
  if (numCaracteres >= 151) {
    inputWritePost.style.color = '#ff0000';
  } else {
    inputWritePost.style.color = '#000000';
  }
});
const getPosts = () => JSON.parse(localStorage.getItem('post'));
const setPosts = arrayInLs => localStorage.setItem('post', JSON.stringify(arrayInLs));

const objPostTexto = {
  text: '',
  src: '',
  fecha: new Date(),
};
const pintarArray = (obj, ele) => {
  ele.innerHTML = '';
  let string = '';
  for (let indice = 0; indice < obj.length; indice++) {
    string += `<div class='new-post'><textArea class = 'template-posts'cols='40' rows='5' width='70%' name='texto' readOnly maxlength='151'>${obj[indice].text}</textArea> <img src= ${obj[indice].src} class= 'imagen'>
<div class='btn-edit'><div class="likes"><img src='../src/imgs/like (1).svg' class='pencil' id=${indice}></div><div><img src='../src/imgs/download.svg' class='pencil ' name='save' id=${indice}><img src='../src/imgs/edit (1).svg' class='pencil' id=${indice} name='edit'><img src='../src/imgs/garbage (1).svg' class='pencil' id=${indice} name='delete'></div></div></div>`;
  }
  ele.innerHTML = string;
};

// Asociar el evento de click al padre
sectionPost.addEventListener('click', (event) => {
  const textInput = inputWritePost.value;
  if (event.target.id === 'save-text') {
    objPostTexto.text = textInput;

    if (localStorage.getItem('post') !== null && (textInput !== '' || inputFile !== '')) {
      const arrPostLocalStorage = getPosts();
      const arr3 = arrPostLocalStorage.slice();
      const arrNuevo = savePost(arr3, objPostTexto);
      setPosts(arrNuevo);
      const arrPostLocalStorage1 = getPosts();
      pintarArray(arrPostLocalStorage1, printerPost);
      inputWritePost.value = '';
      inputFile.value = '';
      preview.src = '';
    } else if (textInput !== '' || inputFile !== '') {
      const guarda = savePost(arrPost, objPostTexto);
      setPosts(guarda);
      pintarArray(guarda, printerPost);
    }
    inputWritePost.value = '';
    inputFile.value = '';
    preview.src = '';
  }
});

document.getElementById('input-file').addEventListener('change', () => {
  const file = document.querySelector('input[type=file]').files[0];
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    preview.src = reader.result;
    objPostTexto.src = reader.result;
  });
  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.src = '';
  }
});

window.addEventListener('load', () => {
  if (localStorage.getItem('post') !== null) {
    const printer = getPosts();
    pintarArray(printer, printerPost);
  }
});
printerPost.addEventListener('click', (event) => {
  const targetMethod = event.target;
  const arrayIndex = targetMethod.id;
  if (targetMethod.name === 'delete') {
    const arrayToDelete = getPosts();
    const deletePost = eliminarObj(arrayToDelete, arrayIndex);
    setPosts(deletePost);
    pintarArray(deletePost, printerPost);
  } else if (targetMethod.name === 'edit') {
    texto[arrayIndex].removeAttribute('readOnly');
  } else if (targetMethod.name === 'save') {
    const arrayToEdit = getPosts();
    const newArray = editPost(arrayToEdit, arrayIndex, texto);
    setPosts(newArray);
    pintarArray(newArray, printerPost);
  }
});
