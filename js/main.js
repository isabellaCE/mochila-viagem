const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");
const items = JSON.parse(localStorage.getItem("items")) || [];

items.forEach((element) => {
  createItem(element.nome, element.quantidade);
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
    atualizarItem(itemAtual);
    items[existe.id] = itemAtual;
  } else {
    itemAtual.id = items.length;
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

  lista.appendChild(novoItem);
}

function atualizarItem(item) {
  document.querySelector("[data-id='" + item.id + "']").innerHTML =
    item.quantidade;
}
