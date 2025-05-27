new WOW().init();

/*======================================================
======================SPOILERS==========================
======================================================*/

function slideToggle(element, duration = 400) {
  const isHidden = window.getComputedStyle(element).display === "none";

  // Показываем элемент временно для измерения высоты
  element.style.display = "block";
  const fullHeight = element.offsetHeight;
  element.style.display = isHidden ? "none" : "block";

  // Применяем overflow: hidden только к родителю, не к медиа-элементам
  element.style.overflow = "hidden";

  // Исключаем медиа-элементы из обработки overflow
  const mediaElements = element.querySelectorAll("img, video, canvas");
  mediaElements.forEach((el) => {
    el.style.overflow = "clip"; // или 'hidden'
  });

  element.style.transition = `height ${duration}ms ease`;

  if (isHidden) {
    element.style.display = "block";
    element.style.height = "0";
    requestAnimationFrame(() => {
      element.style.height = `${fullHeight}px`;
    });
  } else {
    element.style.height = `${fullHeight}px`;
    requestAnimationFrame(() => {
      element.style.height = "0";
    });
  }

  const handleTransitionEnd = () => {
    element.style.transition = "";
    element.style.overflow = "";
    element.style.height = "";

    // Восстанавливаем overflow для медиа-элементов
    mediaElements.forEach((el) => {
      el.style.overflow = "";
    });

    if (!isHidden) {
      element.style.display = "none";
    }
    element.removeEventListener("transitionend", handleTransitionEnd);
  };

  element.addEventListener("transitionend", handleTransitionEnd);
}

const spoilersBody = document.querySelector(".questions__spoilers");
const spoilers = document.querySelectorAll(".questions__spoiler");

window.addEventListener("click", function (e) {
  if (spoilersBody && spoilers) {
    if (e.target.closest(".questions__spoiler")) {
      spoilers.forEach((item) => {
        if (item.children[1].style.display == "block") {
          slideToggle(item.children[1], 300);
          item.classList.remove("_active");
        }
      });
      if (
        e.target.closest(".questions__spoiler").children[1].style.display ==
        "block"
      ) {
        e.target.closest(".questions__spoiler").classList.remove("_active");
      } else {
        e.target.closest(".questions__spoiler").classList.add("_active");
      }
      slideToggle(e.target.closest(".questions__spoiler").children[1], 300);
    } else {
      spoilers.forEach((item) => {
        if (item.children[1].style.display == "block") {
          slideToggle(item.children[1], 300);
          item.classList.remove("_active");
        }
      });
    }
  }
});

/*======================================================
======================MAIN SLIDER=======================
======================================================*/

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

/*======================================================
======================EXAMPLES SLIDER==================
======================================================*/

const examplesSlider = new Swiper(".examples__swiper", {
  loop: false,

  direction: "horizontal",
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
  //AUTOPLAY REVERSE
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

  breakpoints: {
    0: {
      slidesPerView: 2,
      spaceBetween: 14,
    },
    420: {
      slidesPerView: 2.5,
      spaceBetween: 18,
    },
    608: {
      spaceBetween: 18,
      slidesPerView: 3,
    },
    800: {
      slidesPerView: 3,
      spaceBetween: 21,
    },
  },
});

/*======================================================
======================REPORTS SLIDER====================
======================================================*/

const reportsSlider = new Swiper(".reports__swiper", {
  loop: false,
  direction: "horizontal",
  freeMode: true,
  slidesPerView: "auto",
  breakpoints: {
    0: {
      spaceBetween: 12,
    },
    608: {
      spaceBetween: 14,
    },
    800: {
      spaceBetween: 16,
    },
    1024: {
      spaceBetween: 18,
    },
    1232: {
      spaceBetween: 21,
    },
  },
});

/*======================================================
======================CHANGE THEME======================
======================================================*/

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

/*======================================================
===============EXAMPLES BUTTONS ANIMATION===============
======================================================*/

if (document.documentElement.clientWidth > 1024) {
  const examplesButtons = document.querySelector(".examples__buttons");
  if (examplesButtons) {
    examplesButtons.children[1].addEventListener("mouseenter", function (e) {
      examplesButtons.children[0].classList.add("_grey");
    });
    examplesButtons.children[1].addEventListener("mouseleave", function (e) {
      examplesButtons.children[0].classList.remove("_grey");
    });
  }
}

/*======================================================
===============RESPONSIVE MAIN SLIDER===================
======================================================*/

const mainText = document.querySelector(".main-info__text");
const mainSliderObject = document.querySelector(".main-info__swiper");

if (mainText && mainSliderObject) {
  if (document.documentElement.clientWidth <= 798) {
    mainText.style.marginBottom = `${
      mainSliderObject.getBoundingClientRect().height * 0.82
    }px`;
  }

  window.addEventListener("resize", function (e) {
    if (document.documentElement.clientWidth <= 798) {
      mainText.style.marginBottom = `${
        mainSliderObject.getBoundingClientRect().height * 0.82
      }px`;
    } else {
      mainText.style.marginBottom = `0px`;
    }
  });
}
