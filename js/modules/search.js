import getPokemon from "./cards.js";
import initModal from "./modal.js";
export default function initSearch() {
  const btnSearch = document.getElementById("js-btn-search");
  const inputSearch = document.getElementById("js-input-search");
  const pokemonCount = document.getElementById("count");
  const btnLoadMore = document.querySelector(".load-more");
  const pokeGrid = document.querySelector(".all-pokemon");
  btnSearch.addEventListener("click", () => {
    pokeGrid.innerHTML = "";
    searchPokemon();
  });
  inputSearch.addEventListener("keyup", (k) => {
    if (k.key === "Enter") {
      pokeGrid.innerHTML = "";
      searchPokemon();
    }
  });

  function searchPokemon() {
    let inputValue = inputSearch.value.toLowerCase();
    async function makeSearch() {
      const fetchResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${inputValue}`
      );
      const response = await fetchResponse.json();
      const { id, sprites, types, name } = response;

      createCard({ name, id, sprites, types });
    }
    function createCard({ name, id, sprites, types }) {
      const pokeButton = document.createElement("button");
      pokeButton.classList.add(
        "card-pokemon",
        "js-open-details-pokemon",
        `${types[0].type.name}`
      );
      pokeButton.setAttribute("id-pokemon", id)
      pokeButton.innerHTML = `
        <div class="icon">
          <img src="./img/icon-types/${types[0].type.name}.svg" alt="">
        </div>
        <div class="text">
          <h3>${name}</h3>
        </div>
        <div class="image">
          <img style="width:80%;" src="${sprites.other["official-artwork"].front_default}" alt="">
        </div> 
        <div class="info">
          <span>#${id}</span>
        </div>
        `;
      pokeGrid.appendChild(pokeButton);
      const iconType = document.querySelector(".card-pokemon .icon");
      const typeTwo = document.createElement("img");
      if (types.length > 1) {
        typeTwo.src = `./img/icon-types/${types[1].type.name}.svg`;
        iconType.appendChild(typeTwo);
      }
      initModal();
    }
    if (inputValue != "") {
      makeSearch();
      btnLoadMore.style = "display:none;";
      pokemonCount.innerText = "1 Pokemon";
    } else {
      getPokemon();
      btnLoadMore.style = "display:block;";
    }
    inputValue = "";
  }
}
