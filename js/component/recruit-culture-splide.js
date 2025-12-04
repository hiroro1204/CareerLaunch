/**
 * 採用情報ページの働く環境スライダーの初期化
 */

export const initializeRecruitCultureSplide = () => {
  const element = document.querySelector(".js-recruit-culture-splide");

  if (!element) {
    return;
  }

  const splide = new Splide(".js-recruit-culture-splide", {
    type: "loop",
    fixedWidth: "350rem",
    fixedHeight: "234rem",
    gap: "32rem",
    drag: "free",
    easing: "linear",
    arrows: false,
    pagination: false,
    keyboard: "focused",
    autoScroll: {
      speed: 1,
    },
    breakpoints: {
      900: {
        fixedWidth: "223rem",
        fixedHeight: "149rem",
        gap: "10rem",
      },
    },
  });

  // AutoScroll拡張機能をマウント
  if (
    window.splide &&
    window.splide.Extensions &&
    window.splide.Extensions.AutoScroll
  ) {
    splide.mount({ AutoScroll: window.splide.Extensions.AutoScroll });
  } else {
    splide.mount();
  }
};
