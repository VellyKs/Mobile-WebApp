// QUESTÕES DE ESTILO ---------------------------------------------------
// Dark mode ----------------------------------------------------------------


var toggle = document.getElementById("darkLight");

var storedTheme =
  localStorage.getItem("theme") ||
  (window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light");

if (storedTheme)
  document.documentElement.setAttribute("data-theme", storedTheme);
change(storedTheme);
var currentTheme = document.documentElement.getAttribute("data-theme");
if (currentTheme === "dark") {
  toggle.checked = "true";
}

toggle.onclick = function () {
  var currentTheme = document.documentElement.getAttribute("data-theme");
  // moon.checked = true;
  // sun.checked = false;
  var targetTheme = "dark";

  if (currentTheme === "dark") {
    targetTheme = "light";
  }

  document.documentElement.setAttribute("data-theme", targetTheme);
  change(targetTheme);

  localStorage.setItem("theme", targetTheme);
};

function change(theme) {
  if (theme === "dark") {
    document.querySelector("#darklogo").setAttribute("style", "display: block");
    // document.querySelector(".conteiner .moon").setAttribute("style", "display: none")
    document.querySelector("#lightlogo").setAttribute("style", "display: none");
  }
  if (theme === "light") {
    document.querySelector("#darklogo").setAttribute("style", "display: none");
    document
      .querySelector("#lightlogo")
      .setAttribute("style", "display: block");
  }
}

// Dark mode -------------------------------------------------------------------------

const openModal = () => {
  var d = new Date()
  const modal = document.getElementById("modal");
  modal.style.display = "flex";
  document.getElementById("dataHoje").innerHTML = ("0" + d.getDate()).slice(-2) + "/" + ("0" + (d.getMonth() + 1)).slice(-2) + "/" + d.getFullYear()
};

// window.onclick = function(event) {
//     if (event.target === openModal || event.target === openModal.children ) {
//         console.log(event.target);
//         const modal = document.getElementById("modal");
//         modal.style.display = "flex";
//     }
//   }

const closeModal = () => {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
  clearSonho();
};

// console.log(openModal);
// openModal.onclick = function (){
//     var modal = document.querySelector(".modal");
//     modal.classList.add("active");
// }

// QUESTÕES DE ESTILO ---------------------------------------------------

// LOCAL STORAGE ------------------------------------

const getLocalStorage = () =>
  JSON.parse(localStorage.getItem("db_diario")) ?? [];

const setLocalStorage = (db_diario) =>
  localStorage.setItem("db_diario", JSON.stringify(db_diario));

const clearSonho = () => {
  const sonho = document.querySelector("#modalSonho");
  const sonhoTitulo = document.querySelector("#sonhoTitulo");

  sonho.value = "";
  sonhoTitulo.value = "";
};

const clear_li = () => {
  const itens = document.querySelectorAll(".itemLista");
  itens.forEach((row) => row.parentNode.removeChild(row));
};

const update_li = () => {
  vazio();
  // ordenar();
  const db_diario = readSonhos();
  clear_li();
  db_diario.forEach(createrow);
  

};

let modo = "create";

// ======================================================

const createrow = (diario, index) => {
  const newrow = document.createElement("li");
  newrow.className = "itemLista";
  newrow.innerHTML = `
    <div class="data" id = '${index}'>
        <p>${diario.data}</p>
    </div>
    <div class="sonhoLista">
        <div class="preview">
            <header>
                <h1>${diario.titulo}</h1>
                <br>
            </header>
            <p>${diario.sonho}
            </p>
        </div>
        <div class="detail">
            <div class="duracao">
                <img id="sleep"
                src="assets/images/Sleep.svg" alt>
                <p>${diario.duracao}</p>
            </div>
            <div id="time">
                <p>${diario.hora}</p>
            </div>
            </div>
        </div>
      `;

  document.getElementById("lista").appendChild(newrow);
};

const vazio = () => {
  const sonhos = getLocalStorage().length;
  console.log(sonhos);

  if (sonhos < 1) {
    document.getElementById("vazio").style.display = "flex"
  }
  else {
    document.getElementById("vazio").style.display = "none"

  }


};

//create
const createSonho = (sonho) => {
  const db_diario = getLocalStorage();
  db_diario.push(sonho);

  setLocalStorage(db_diario);
};

//read
const readSonhos = () => getLocalStorage();

//update
const updateSonho = (index, sonho) => {
  const db_diario = readSonhos();
  db_sonho[index] = sonho;
  setLocalStorage(db_diario);
};

// //delete
// const deleteSonho = () => {
//     const index = document.getElementById("delete-btn").className;
//     const db_receita = readreceita();
//     db_receita.splice(index, 1);
//     setLocalStorage(db_receita);
//     update_li();
//     closeView();
//   };

const saveSonho = () => {
  const d = new Date();
  const sonho = {
    titulo: document.getElementById("sonhoTitulo").value,
    sonho: document.getElementById("modalSonho").value,
    hora: ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2),
    data: ("0" + d.getDate()).slice(-2) + "/" + ("0" + (d.getMonth() + 1)).slice(-2) + "/" + ("0" + d.getFullYear()).slice(-2),
  };

  // const index = document.getElementById('titulo').dataset.index
  // console.log(index)

  if (modo === "create") {
    createSonho(sonho);
    update_li();
    console.log("Cadastrando");
    // clearFields();
    console.log(d);

  }
  // if (modo === "edit") {
  //     updatereceita(index, receita)
  //     // clearFields();
  //     update_li();
  //     closeModal();
  // }

  // window.alert('Salvo')
  // mostrarMensagem()
  closeModal();
  modo = "create";
};

// function mostrarMensagem() {
//     var mensagem = document.getElementById("mensagem");
//     mensagem.style.display = "block"; // Torna a mensagem visível
//     setTimeout(function() {
//         mensagem.style.display = "none";
//     }, 1000);
//   }

document.getElementById("send").addEventListener("click", saveSonho);
document.getElementById("new").addEventListener("click", openModal);
document.getElementById("closeModal").addEventListener("click", closeModal);


update_li();
// listaMax();


// ================ Signo api ==================

const getLocalApi = () =>
  JSON.parse(localStorage.getItem("signo")) ?? [];

const setLocalApi = (signo) =>
  localStorage.setItem("signo", JSON.stringify(signo));

const saveSigno = () => {
  const signo = document.getElementById("signoApi").value

  setLocalApi(signo)
  fillApi(signo)
}

const inputSigno = () => {
  console.log("iii", getLocalApi())
  const input = document.querySelector(".signoInput");
  const text = document.getElementById("signoDiv");
  if (getLocalApi().length > 0){
    input.style.display = "none";
    text.style.display = "flex";
  }else{
    input.style.display = "flex";
    text.style.display = "none";
  }
}

const fillApi = () => {
  const storageSigno = JSON.parse(localStorage.getItem("signo"))
  console.log(storageSigno)

  document.getElementById("signoDiv").innerHTML = `<h3>${storageSigno}</h3>`
  
  // const text = document.getElementById("signoDiv")
  // text.style.display = "flex"
  // text.innerHTML(`<h3>${storageSigno}</h3>`)
  // const signo = document.getElementById("signoApi")
}

document.getElementById("sendSigno").addEventListener('click', async (event) => {
  event.preventDefault();
  const div = document.querySelector("#horoscopo");

  const signo = document.getElementById('signoApi').value;
  saveSigno(signo)

  try {
    const response = await fetch(`http://localhost/signo/${signo}/dia`);
    const horoscopo = await response.json();

    console.log(horoscopo)

    div.innerHTML = `
      <h2>Horóscopo para ${horoscopo.signo}</h2>
      <p>${horoscopo.texto}</p>
      <p>Autor: ${horoscopo.autor}</p>
      <p><a href="${horoscopo.urlOrigem}" target="_blank">Fonte</a></p>
    `;
  } catch (error) {
    console.error('Erro ao buscar o horóscopo:', error);
    div.innerHTML = `<p>Erro ao buscar o horóscopo. Verifique o signo digitado.</p>`;
  }
});


fillApi();
inputSigno();