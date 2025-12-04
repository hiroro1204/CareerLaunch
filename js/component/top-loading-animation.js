/**
 * トップページのローディングアニメーション機能
 * ページ読み込み時にローディング画面を表示し、読み込み完了後にフェードアウト
 */
export function initializeTopLoadingAnimation() {
  const loadingElement = document.querySelector(".js-top-loading");

  if (!loadingElement) return;

  // GSAPが読み込まれているか確認
  if (typeof gsap === "undefined") {
    return;
  }

  const loadingInner = loadingElement.querySelector(".js-top-loading-inner");
  const loadingImageContainer = loadingElement.querySelector(
    ".js-top-loading-image"
  );
  const loadingImages = loadingImageContainer
    ? loadingImageContainer.querySelectorAll("img")
    : [];

  // 初期状態: ローディング画面を表示
  gsap.set(loadingElement, {
    display: "block",
    opacity: 1,
  });

  // 画像の初期状態: 上に配置（画面外）
  if (loadingImages.length >= 2) {
    gsap.set(loadingImages[0], {
      y: -150,
      opacity: 0,
    });
    gsap.set(loadingImages[1], {
      y: -150,
      opacity: 0,
    });
  }

  // フェードアウト開始のフラグ
  let isPageLoaded = false;
  let isAnimationComplete = false;

  // フェードアウトを開始する関数
  const startFadeOut = () => {
    if (isPageLoaded && isAnimationComplete) {
      // 少し遅延させてからふわっとフェードアウト
      gsap.to(loadingElement, {
        opacity: 0,
        duration: 0.8,
        ease: "power1.out",
        delay: 0.3, // アニメーションの完了後0.3秒遅れてフェードアウト
        onComplete: () => {
          // アニメーション完了後に要素を非表示
          gsap.set(loadingElement, {
            display: "none",
          });
          // ローディング完了のカスタムイベントを発火
          window.dispatchEvent(new CustomEvent("loadingComplete"));
        },
      });
    }
  };

  // 左の画像が上から降りてくるアニメーション
  if (loadingImages.length >= 2) {
    // 左の画像（1枚目）を上から降りてくる
    gsap.to(loadingImages[0], {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
      onComplete: () => {
        // 左の画像のアニメーション完了後、右の画像を上から降りてくる
        gsap.to(loadingImages[1], {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          onComplete: () => {
            // 右の画像のアニメーション完了後、フラグを立てる
            isAnimationComplete = true;
            startFadeOut();
          },
        });
      },
    });
  } else {
    // 画像が2枚ない場合は、アニメーション完了として扱う
    isAnimationComplete = true;
  }

  // ページ読み込み完了後にローディング画面を非表示
  window.addEventListener("load", () => {
    isPageLoaded = true;
    startFadeOut();
  });
}
