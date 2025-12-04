/**
 * スタッフ紹介スライダーの初期化
 */

export const initializeAboutStaffSplide = () => {
  const element = document.querySelector(".js-about-staff-splide");

  if (!element) {
    return;
  }

  const splide = new Splide(".js-about-staff-splide", {
    type: "loop",
    perPage: 1,
    arrows: false,
    drag: true,
    fixedWidth: "285rem",
    gap: "40rem",
    pagination: false,
    autoplay: true,
    interval: 3000,
    speed: 1000,
    easing: "ease-in-out",
    rewind: true,
    pauseOnHover: true,
    pauseOnFocus: true,
    keyboard: "focused",

    breakpoints: {
      900: {
        perPage: 1,
        fixedWidth: "230rem",
        gap: "32rem",
      },
    },
  });

  splide.mount();
};
