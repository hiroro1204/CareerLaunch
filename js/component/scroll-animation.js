/**
 * スクロールに応じてカードが表示されるアニメーション機能
 * HTML要素に .js-scroll-fade-in クラスを追加するだけで使用可能
 * .js-scroll-stagger 内の要素は除外（scroll-stagger-animation.jsで処理）
 */
export function initializeScrollAnimation() {
  const elements = document.querySelectorAll(".js-scroll-fade-in");

  if (elements.length === 0) return;

  elements.forEach((element) => {
    // .js-scroll-stagger 内の要素は除外（重複実行を防ぐ）
    if (element.closest(".js-scroll-stagger")) {
      return;
    }

    // 初期状態: 非表示＋下方向へオフセット
    gsap.set(element, {
      opacity: 0,
      y: 30,
    });

    // スクロールでアニメーション実行
    gsap.to(element, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "top 70%",
        toggleActions: "play none none none",
      },
    });
  });
}
