export default function initSwiper() {
  var slide_hero = new Swiper(".slide-hero", {
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
}