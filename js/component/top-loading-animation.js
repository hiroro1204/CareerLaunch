/**
 * トップページのローディングアニメーション機能
 * ページ読み込み時にローディング画面を表示し、読み込み完了後にフェードアウト
 * 一度表示したことがあるかどうかをセッションストレージで判定し、2回目以降はアニメーションをスキップ
 */

export function initializeTopLoadingAnimation() {
  const loadingElement = document.querySelector(".js-top-loading");
  if (!loadingElement) return;

  const loadingImageContainer = loadingElement.querySelector(
    ".js-top-loading-image"
  );
  const loadingImages = loadingImageContainer
    ? loadingImageContainer.querySelectorAll("img")
    : [];

  // カスタムイベント「loadingComplete」を発火する共通関数
  const dispatchLoadingComplete = () => {
    window.dispatchEvent(new CustomEvent("loadingComplete"));
  };

  // 一度表示したことがあるかどうかをセッションストレージで判定
  const hasShownLoading = sessionStorage.getItem("hasShownLoading");

  if (hasShownLoading) {
    gsap.set(loadingElement, {
      display: "none",
      opacity: 0,
    });
    // 2回目以降はアニメーションをスキップ
    // ただし、type-text-animation.jsが待っているloadingCompleteイベントは発火する必要がある
    if (document.readyState === "complete") {
      dispatchLoadingComplete();
    } else {
      window.addEventListener("load", dispatchLoadingComplete, { once: true });
    }
    return;
  }

  // 初回表示時はフラグを立てる
  sessionStorage.setItem("hasShownLoading", "true");

  // GSAPが読み込まれているか確認
  if (typeof gsap === "undefined") {
    return;
  }

  // 初期状態: ローディング画面を表示
  gsap.set(loadingElement, {
    display: "block",
    opacity: 1,
  });

  // 画像の初期状態: 上に配置（画面外）
  loadingImages.forEach((img) => {
    gsap.set(img, {
      y: -150,
      opacity: 0,
    });
  });

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
          dispatchLoadingComplete();
        },
      });
    }
  };

  // 画像が上から降りてくるアニメーション
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
