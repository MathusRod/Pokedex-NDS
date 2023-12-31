import initModal from "./modal.js";
export default function initTypes() {
  const gridTypes = document.querySelector(".pokemon-type");
  const gridTypesMobile = document.querySelector(".dropdown-select");
  let activeType = null;

  async function getTypes() {
    const fetchResponse = await fetch(`https://pokeapi.co/api/v2/type`);
    const response = await fetchResponse.json();
    const { results } = response;
    let index = 1;
    const limitedResults = results.slice(0, 17);

    limitedResults.forEach((res) => {
      createType(res, index);
      index += 1;
    });
  }
  async function createType(res, index) {
    const type = document.createElement("div");
    type.classList.add("type-filter", `${res.name}`);
    type.setAttribute("code-type", index);
    type.innerHTML = `
      <div class="icon">
        <img src="./img/icon-types/${res.name}.svg" alt="">
      </div>
      <span>${res.name}</span>
    `;
    type.addEventListener("click", filterByTypes);
    gridTypes.appendChild(type);

    const typeMobile = document.createElement("div");
    typeMobile.classList.add("type-filter", `${res.name}`);
    typeMobile.setAttribute("code-type", index);
    typeMobile.innerHTML = `
        <div class="icon">
          <img src="./img/icon-types/${res.name}.svg" alt="">
        </div>
        <span>${res.name}</span>
    `;
    typeMobile.addEventListener("click", filterByTypes);
    gridTypesMobile.appendChild(typeMobile);
  }
  const pokeArea = document.querySelector(".all-pokemon");
  const pokeCount = document.getElementById("count");
  const btnLoadMore = document.querySelector(".load-more");
  const typeAll = document.querySelectorAll(".all");
  typeAll.forEach((typeA) =>
    typeA.addEventListener("click", () => {
      window.location.reload(true);
    })
  );

  async function filterByTypes() {
    const selectcustom = document.querySelector(".select-custom");
    selectcustom.classList.remove("active");
    const idPokemon = this.getAttribute("code-type");
    const typeSelectedMobile = document.querySelector(".item-selected strong");
    const name = this.innerText
    typeSelectedMobile.innerText=name

    if (activeType) {
      activeType.classList.remove("active");
    }
    typeAll.forEach((typeA) =>
    typeA.classList.remove("active")
  );
    // Set the clicked type as the active type
    activeType = this;
    activeType.classList.add("active");

    const fetchResponse = await fetch(
      `https://pokeapi.co/api/v2/type/${idPokemon}`
    );
    const response = await fetchResponse.json();
    const { pokemon } = response;

    pokeArea.innerHTML = "";
    btnLoadMore.style = "display:none;";
    pokeCount.innerText = `${pokemon.length} pokémon`;
    pokemon.forEach((pok) => {
      const res = pok.pokemon;
      async function getUrlType() {
        const fetchResponse = await fetch(res.url);
        const response = await fetchResponse.json();
        const { id, sprites, types, name } = response;
        async function createCard({ name, id, sprites, types }) {
          const pokeButton = document.createElement("button");
          pokeButton.classList.add(
            "card-pokemon",
            "js-open-details-pokemon",
            `${types[0].type.name}`
          );
          pokeButton.setAttribute("id-pokemon", id);
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
          pokeArea.appendChild(pokeButton);
          const iconType = document.querySelectorAll(".card-pokemon .icon");
          const typeTwo = document.createElement("img");
          if (types.length == 2) {
            typeTwo.src = `./img/icon-types/${types[1].type.name}.svg`;
            iconType.forEach((icon) => icon.appendChild(typeTwo));
          }
          initModal();
        }
        createCard({ name, id, sprites, types });
      }
      getUrlType();
    });
  }
  getTypes();
}
