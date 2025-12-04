/**
 * ハンバーガーメニュー
 */

export const initializeHamburgerMenu = () => {
  const menu = document.querySelector(".js-header-menu");
  const button = document.querySelector(".js-hamburger-button");
  const closeButton = document.querySelector(".js-hamburger-close-button");
  const isActive = "is-active";

  // コンテンツ Opening Keyframe
  const contentsOpeningKeyframes = {
    opacity: [0, 1],
  };

  // コンテンツ Opening Option
  const contentsOpeningOptions = {
    duration: 200,
    easing: "ease-out",
  };

  // コンテンツ Closing Keyframe
  const contentsClosingKeyframes = {
    opacity: [1, 0],
  };

  // コンテンツ Closing Option
  const contentsClosingOptions = {
    duration: 200,
    easing: "ease-out",
  };

  // menuとbuttonがページ内にない場合returnする
  if (!menu || !button) return;

  // メニューopenする関数
  const openMenu = () => {
    menu.showModal();
    menu.animate(contentsOpeningKeyframes, contentsOpeningOptions);
    document.body.style.overflow = "hidden"; // 背景固定
    button.classList.add(isActive);
    closeButton.classList.add(isActive);
  };

  // メニューcloseする関数
  const closeMenu = () => {
    const closingAnim = menu.animate(
      contentsClosingKeyframes,
      contentsClosingOptions
    );
    button.classList.remove(isActive);
    closeButton.classList.remove(isActive);

    // アニメーションの完了後
    closingAnim.onfinish = () => {
      menu.close();
      document.body.style.overflow = ""; // 背景固定解除
    };
  };

  // ボタンクリックでopen
  button.addEventListener("click", () => {
    openMenu();
  });

  // クローズボタンクリックでclose
  closeButton.addEventListener("click", () => {
    closeMenu();
  });

  // Escapeキーを押すと非表示
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu();
    }
  });
};
