const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");
const items = [];

form.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const nome = evento.target.elements["nome"];
  const quantidade = evento.target.elements["quantidade"];

  createItem(nome.value, quantidade.value);

  nome.value = "";
  quantidade.value = "";
});

function createItem(nome, quantidade) {
  const novoItem = document.createElement("li");
  novoItem.classList.add("item");

  const quantidadeItem = document.createElement("strong");
  quantidadeItem.innerHTML = quantidade;

  novoItem.appendChild(quantidadeItem);
  novoItem.innerHTML += nome;

  lista.appendChild(novoItem);

  const item = { nome: nome, quantidade: quantidade };
  items.push(item);
  localStorage.setItem("items", JSON.stringify(items));
}
