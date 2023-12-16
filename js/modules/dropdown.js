export default function initDropdown(){
  const btnDropdownSelect = document.querySelector(".js-open-select-custom");
  const selectcustom = document.querySelector(".select-custom");
  btnDropdownSelect.addEventListener("click",()=>{
    selectcustom.classList.toggle("active");
  })
}