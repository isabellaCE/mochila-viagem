const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");
const items = JSON.parse(localStorage.getItem("items")) || [];

items.forEach((element) => {
  createItem(element);
});

form.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const nome = evento.target.elements["nome"];
  const quantidade = evento.target.elements["quantidade"];

  const existe = items.find((element) => element.nome === nome.value);

  const itemAtual = {
    nome: nome.value,
    quantidade: quantidade.value,
  };

  if (existe) {
    itemAtual.id = existe.id;
    updateItem(itemAtual);
    items[items.findIndex((element) => element.id === existe.id)] = itemAtual;
  } else {
    itemAtual.id = items[items.length - 1] ? items[items.length - 1].id + 1 : 0;
    createItem(itemAtual);
    items.push(itemAtual);
  }
  localStorage.setItem("items", JSON.stringify(items));

  nome.value = "";
  quantidade.value = "";
});

function createItem(newItem) {
  const novoItem = document.createElement("li");
  novoItem.classList.add("item");

  const quantidadeItem = document.createElement("strong");
  quantidadeItem.innerHTML = newItem.quantidade;
  quantidadeItem.dataset.id = newItem.id;

  novoItem.appendChild(quantidadeItem);
  novoItem.innerHTML += newItem.nome;
  novoItem.appendChild(createButtonDelete(newItem.id));

  lista.appendChild(novoItem);
}

function updateItem(item) {
  document.querySelector("[data-id='" + item.id + "']").innerHTML =
    item.quantidade;
}

function createButtonDelete(id) {
  const buttonDelete = document.createElement("button");
  buttonDelete.innerText = "X";

  buttonDelete.addEventListener("click", function () {
    deleteItem(this.parentNode, id);
  });

  return buttonDelete;
}

function deleteItem(item, id) {
  item.remove();
  console.log(id);
  items.splice(
    items.findIndex((element) => element.id === id),
    1
  );
  console.log(items);
  localStorage.setItem("items", JSON.stringify(items));
}
