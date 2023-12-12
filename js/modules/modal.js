export default function initModal(){
  const cardPokemon = document.querySelectorAll(".js-open-details-pokemon");
  const btnCloseModal = document.querySelector(".js-close-datails-pokemon");
  const overlay = document.querySelector(".overlay")

  function openDetailsPokemon(){
    document.documentElement.classList.add("open-modal");
  }
  function closeDetailsPokemon(){
    document.documentElement.classList.remove("open-modal");
  }
  function outSideModal(event){
    if(event.target === this){
      closeDetailsPokemon(event)
    }
  }

  cardPokemon.forEach(
    card=> card.addEventListener("click", openDetailsPokemon)
  );

  btnCloseModal.addEventListener("click", closeDetailsPokemon);

  overlay.addEventListener("click", outSideModal)
}