export default function initModal() {
  function openDetailsPokemon() {
    document.documentElement.classList.add("open-modal");
    const idPokemon = this.getAttribute("id-pokemon");
    async function getDetails() {
      const fetchResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${idPokemon}`
      );
      const response = await fetchResponse.json();
      const { name, stats, sprites, types, id, weight, height, abilities } =
        response;
      createModal({
        name,
        stats,
        sprites,
        types,
        id,
        weight,
        height,
        abilities,
      });
      async function getWeak() {
        const fetchResponseType = await fetch(types[0].type.url);
        const responseType = await fetchResponseType.json();
        const { damage_relations } = responseType;
        const weaks = damage_relations.double_damage_from;
        changeWeak(weaks);
      }
      getWeak();
    }
    getDetails();
  }
  function closeDetailsPokemon() {
    document.documentElement.classList.remove("open-modal");
  }
  function createModal({
    name,
    stats,
    sprites,
    types,
    id,
    weight,
    height,
    abilities,
  }) {
    const modal = document.querySelector(".modal");
    modal.setAttribute("type-pokemon-modal", `${types[0].type.name}`);
    modal.innerHTML = `
    <div class="overlay"></div>
    <div class="box">
      <button class="close js-close-datails-pokemon">
        <img src="./img/close.svg" alt="">
      </button>
      <div class="left-container">
        <div class="icon">
          <img src="./img/icon-types/${types[0].type.name}.svg" alt="">
        </div>
        <div class="image">
          <img src="${sprites.other["official-artwork"].front_default}" alt="">
        </div>
      </div>
      <div class="right-container">
        <div class="name">
          <h2>${name}</h2>
          <span>#${id}</span>
        </div>
        <ul class="type">
          <li>
            <span class="tag-type ${types[0].type.name}">${
      types[0].type.name
    }</span>
          </li>
        </ul>
        <ul class="info">
          <li>
            <span>Altura</span>
            <strong> ${height / 10}m</strong>
          </li>
          <li>
            <span>Peso</span>
            <strong>${weight / 10}kg</strong>
          </li>
          <li>
            <span>Abilities</span>
            <strong>${abilities[0].ability.name}</strong>
          </li>
        </ul>
        <div class="weak">
          <h4>Weaknesses</h4>
          <div class="weak-types">
            <span class="tag-type fire">Fire</span>
            <span class="tag-type psychic">Psychic</span>
            <span class="tag-type flying">Flying</span>
            <span class="tag-type ice">Ice</span>
          </div>
        </div>
        <div class="stats">
          <h5>Status</h5>
          <div class="all">
            <div class="item">
              <span>HP [${stats[0].base_stat}]</span>
              <div class="bar-status hp">
                <div class="bar"></div>
                <ul class="separator">
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </div>
            </div>
            <div class="item">
              <span>Attack [${stats[1].base_stat}]</span>
              <div class="bar-status attack">
                <div class="bar"></div>
                <ul class="separator">
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </div>
            </div>
            <div class="item">
              <span>Defense [${stats[2].base_stat}]</span>
              <div class="bar-status defense">
                <div class="bar"></div>
                <ul class="separator">
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </div>
            </div>
            <div class="item">
              <span>Sp. attack [${stats[3].base_stat}]</span>
              <div class="bar-status sp-attack">
                <div class="bar"></div>
                <ul class="separator">
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </div>
            </div>
            <div class="item">
              <span>Sp. defense [${stats[4].base_stat}]</span>
              <div class="bar-status sp-defense">
                <div class="bar"></div>
                <ul class="separator">
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </div>
            </div>
            <div class="item">
              <span>Speed [${stats[5].base_stat}]</span>
              <div class="bar-status speed">
                <div class="bar"></div>
                <ul class="separator">
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;

    const hp = document.querySelector(".hp .bar");
    hp.style.width = `${Math.min(stats[0].base_stat, 100)}%`;
    const attack = document.querySelector(".attack .bar");
    attack.style.width = `${Math.min(stats[1].base_stat, 100)}%`;
    const defense = document.querySelector(".defense .bar");
    defense.style.width = `${Math.min(stats[2].base_stat, 100)}%`;
    const spAttack = document.querySelector(".sp-attack .bar");
    spAttack.style.width = `${Math.min(stats[3].base_stat, 100)}%`;
    const spDefense = document.querySelector(".sp-defense .bar");
    spDefense.style.width = `${Math.min(stats[4].base_stat, 100)}%`;
    const speed = document.querySelector(".speed .bar");
    speed.style.width = `${Math.min(stats[5].base_stat, 100)}%`;

    const iconType = document.querySelector(".right-container .type");
    const liTypeTwo = document.createElement("li");
    const typeTwo = document.createElement("span");

    if (types.length > 1) {
      typeTwo.classList.add("tag-type", `${types[1].type.name}`);
      typeTwo.innerText = `${types[1].type.name}`;
      liTypeTwo.appendChild(typeTwo);
      iconType.appendChild(liTypeTwo);
    }

    const btnCloseModal = document.querySelector(".js-close-datails-pokemon");
    const overlay = document.querySelector(".overlay");
    btnCloseModal.addEventListener("click", closeDetailsPokemon);

    overlay.addEventListener("click", outSideModal);
  }
  function changeWeak(weaks) {
    const weaksTypes = document.querySelector(".weak-types");
  
    // Limpar os elementos existentes antes de adicionar os novos
    weaksTypes.innerHTML = '';
  
    // Criar um conjunto para armazenar tipos únicos
    const uniqueTypes = new Set();
  
    // Adicionar os tipos ao conjunto
    weaks.forEach((weak) => {
      uniqueTypes.add(weak.name);
    });
  
    // Adicionar elementos ao DOM a partir do conjunto
    uniqueTypes.forEach((typeName) => {
      const weakSpan = document.createElement("span");
      weakSpan.classList.add("tag-type", typeName);
      weakSpan.innerText = typeName;
      weaksTypes.appendChild(weakSpan);
    });
  }

  const cardPokemon = document.querySelectorAll(".card-pokemon");
  cardPokemon.forEach((card) =>
    card.addEventListener("click", openDetailsPokemon)
  );
  function outSideModal(event) {
    if (event.target === this) {
      closeDetailsPokemon(event);
    }
  }
}
