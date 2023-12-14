import initModal from "./modal.js";
export default function initCards() {
  const pokemonCount = document.getElementById("count");
  const pokeGrid = document.querySelector(".all-pokemon");
  const btnLoadMore = document.querySelector(".load-more");
  const btnAll = document.querySelector(".all");
  btnAll.addEventListener("click", () => {
    pokeGrid.innerHTML = "";
    getPokemon();
  });
  let limit = 9;
  let offset = 0;
  btnLoadMore.addEventListener("click", () => {
    if (offset === 0) offset = limit;
    else offset += 9;
    getPokemon();
  });

  async function getPokemon() {
    const fetchResponse = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
    const result = await fetchResponse.json();
    const { results, count } = result;
    pokemonCount.innerText = `${count} pokémon`;
    // results.forEach(res => createCard(res));
    const cardsData = await Promise.all(
      results.map(async (res) => getIdAndSprites(res))
    );

    // Após todas as chamadas assíncronas, criar os cards
    cardsData.forEach(createCard);
  }

  async function getIdAndSprites(res) {
    const fetchResponse = await fetch(res.url);
    const response = await fetchResponse.json();
    const { id, sprites, types } = response;
    return { res, id, sprites, types };
  }

  async function createCard({ res, id, sprites, types }) {
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
        <h3>${res.name}</h3>
      </div>
      <div class="image">
        <img style="width:80%;" src="${sprites.other["official-artwork"].front_default}" alt="">
      </div> 
      <div class="info">
        <span>#${id}</span>
      </div>
      `;
      pokeGrid.appendChild(pokeButton);
      const iconType = document.querySelectorAll(".card-pokemon .icon")
      const typeTwo = document.createElement("img");
      if(types.length==2){
        typeTwo.src=`./img/icon-types/${types[1].type.name}.svg`
        iconType.forEach(icon=>icon.appendChild(typeTwo))
      }
      initModal();
  }
  //Ativando as funções
  getPokemon();
}
