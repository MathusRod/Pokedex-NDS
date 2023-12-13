export default function initTypes() {
  const gridTypes = document.querySelector(".pokemon-type");
  async function getTypes() {
    const fetchResponse = await fetch(`https://pokeapi.co/api/v2/type`);
    const response = await fetchResponse.json();
    const { results } = response;
    let index = 1;
    const limitedResults = results.slice(0, 17);

    limitedResults.forEach((res) => {
      createType(res,index)
      index+=1
    });
  }
  async function createType(res,index) {
    const type = document.createElement("div");
    type.classList.add("type-filter", `${res.name}`);
    type.setAttribute("code-type",index)
    type.innerHTML = `
      <div class="icon">
        <img src="./img/icon-types/${res.name}.svg" alt="">
      </div>
      <span>${res.name}</span>
    `;
    type.addEventListener("click", filterByTypes)
    gridTypes.appendChild(type);
  }
  async function filterByTypes(){
    const idPokemon = this.getAttribute("code-type")
    const fetchResponse = await fetch(`https://pokeapi.co/api/v2/type/${idPokemon}`);
    const response = await fetchResponse.json();
    console.log(response.pokemon)
  }
  getTypes();
}
