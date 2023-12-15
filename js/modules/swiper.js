export default function initSwiper() {
  var slide_hero = new Swiper(".s-area-slide-hero .slide-hero", {
    effect: "fade",
    pagination: {
      el: ".s-area-slide-hero .slide-hero .swiper-wrapper .swiper-slide .container .area-explore .swiper-pagination",
      clickable: true,
    },
  });
}
