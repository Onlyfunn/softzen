new WOW().init();

const mainSlider = new Swiper(".main-info__swiper", {
  loop: true,
  direction: "horizontal",
  speed: 500,
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
  autoplay: {
    delay: 3000,
  },
  pagination: {
    el: ".main-info__swiper-pagination",
    clickable: true,
  },
});

const examplesSlider = new Swiper(".examples__swiper", {
  loop: false,

  direction: "horizontal",
  slidesPerView: 3,
  spaceBetween: 21,
  speed: 500,
  autoplay: {
    delay: 1000,
    disableOnInteraction: true,
    reverseDirection: false,
  },
  pagination: {
    el: ".examples__swiper-pagination",
    clickable: true,
  },
  navigation: {
    prevEl: ".examples__swiper-button-prev",
    nextEl: ".examples__swiper-button-next",
  },
  on: {
    init: function () {
      this.autoplayReverse = false;
    },
    reachEnd: function () {
      this.params.autoplay.reverseDirection = true;
      this.autoplay.start();
      this.autoplayReverse = true;
    },
    reachBeginning: function () {
      this.params.autoplay.reverseDirection = false;
      this.autoplay.start();
      this.autoplayReverse = false;
    },
  },
});

const reportsSlider = new Swiper(".reports__swiper", {
  loop: false,
  direction: "horizontal",
  freeMode: true,
  slidesPerView: 2.62,
  spaceBetween: 21,
});

document.addEventListener("keydown", function (e) {
  if (e.code == "KeyT") {
    if (document.body.classList.contains("light-theme")) {
      document.body.classList.remove("light-theme");
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");
    }
  }
});

const examplesButtons = document.querySelector(".examples__buttons");
examplesButtons.children[1].addEventListener("mouseenter", function (e) {
  examplesButtons.children[0].classList.add("_grey");
});
examplesButtons.children[1].addEventListener("mouseleave", function (e) {
  examplesButtons.children[0].classList.remove("_grey");
});
