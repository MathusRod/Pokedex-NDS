export default function initSwiper() {
  var slide_hero = new Swiper(".s-area-slide-hero .slide-hero", {
    effect: "fade",
    pagination: {
      el: ".swiper-pagination",
    },
  });
}
