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
  var d = new Date();
  const modal = document.getElementById("modal");
  modal.style.display = "flex";
  document.getElementById("dataHoje").innerHTML =
    ("0" + d.getDate()).slice(-2) +
    "/" +
    ("0" + (d.getMonth() + 1)).slice(-2) +
    "/" +
    d.getFullYear();
};

// window.onclick = function(event) {
//     if (event.target === openModal || event.target === openModal.children ) {
//         console.log(event.target);
//         const modal = document.getElementById("modal");
//         modal.style.display = "flex";
//     }
//   }

const closeModal = () => {
  console.log("cliccckkk");
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
/* 
const getLocalStorage = () =>
  JSON.parse(localStorage.getItem("db_diario")) ?? [];

const setLocalStorage = (db_diario) =>
  localStorage.setItem("db_diario", JSON.stringify(db_diario)); */
const vazio = async (sonhos) => {
  try {
    const sonho = await sonhos;
    console.log(sonhos);
    if (sonho.length < 1) {
      document.getElementById("vazio").style.display = "flex";
    } else {
      document.getElementById("vazio").style.display = "none";
    }
  } catch {}
};

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

// GET

const readSonhos = async () => {
  try {
    const response = await fetch("/diario"); // Fazendo a solicitação GET para a rota /diario
    if (!response.ok) {
      throw new Error("Erro ao recuperar sonhos");
    }
    const data = await response.json(); // Convertendo a resposta para JSON
    console.log("Sonhos recuperados:", data);

    update_li(data);

    // Aqui você pode fazer o que quiser com os dados, como atualizar a interface do usuário
  } catch (error) {
    console.error("Erro ao recuperar sonhos:", error.message);
    // Lidar com o erro, se necessário
  }
};

const update_li = async (sonho) => {
  try {
    const sonhos = await sonho;
    vazio(sonho);
    /*   // ordenar();
    const db_diario = readSonhos(); */
    clear_li();
    sonho.forEach(createrow);
  } catch {}
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
                <p></p>
            </div>
            <div id="time">
                <p>${diario.hora}</p>
            </div>
            </div>
        </div>
      `;

  document.getElementById("lista").appendChild(newrow);
};

//create

const createSonho = async (sonho) => {
  try {
    const response = await fetch("/diario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sonho),
    });

    if (!response.ok) {
      throw new Error("Erro ao adicionar sonho");
    }

    const data = await response.json();
    console.log("Sonho adicionado:", data);

    // Após adicionar com sucesso, atualize a lista de sonhos
    readSonhos();
    vazio(data);
    // Atualize a interface do usuário conforme necessário
  } catch (error) {
    console.error("Erro ao adicionar sonho:", error.message);
    // Lide com o erro na interface do usuário, se necessário
  }
};

/* const createSonho = (sonho) => {
  const db_diario = getLocalStorage();
  db_diario.push(sonho);

  setLocalStorage(db_diario);
}; */

/* const readSonhos = () => getLocalStorage(); */

//update

/* const updateSonho = (index, sonho) => {
  const db_diario = readSonhos();
  db_sonho[index] = sonho;
  setLocalStorage(db_diario);
};
 */

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
    hora:
      ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2),
    data:
      ("0" + d.getDate()).slice(-2) +
      "/" +
      ("0" + (d.getMonth() + 1)).slice(-2) +
      "/" +
      ("0" + d.getFullYear()).slice(-2),
  };

  // const index = document.getElementById('titulo').dataset.index
  // console.log(index)

  if (modo === "create") {
    console.log(sonho);
    createSonho(sonho);
    update_li(sonho);
    console.log("Cadastrando");
  }
  // if (modo === "edit") {
  //     updatereceita(index, receita)
  //     // clearFields();
  //     update_li();
  //     closeModal();
  // }

  closeModal();
  // mostrarMensagem()

  modo = "create";
};

document.getElementById("send").addEventListener("click", saveSonho);
document.getElementById("new").addEventListener("click", openModal);
document.getElementById("closeModal").addEventListener("click", closeModal);
document.addEventListener("DOMContentLoaded", readSonhos);
document.addEventListener("DOMContentLoaded", vazio);
