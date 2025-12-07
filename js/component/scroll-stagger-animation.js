/**
 * スクロールに応じて横並び要素を順番に表示するアニメーション機能
 * PCサイズ（900px以上）のときのみ順番に表示、SPサイズでは個別に表示
 * 親要素に .js-scroll-stagger クラスを追加するだけで使用可能
 */
export function initializeScrollStaggerAnimation() {
  const containers = document.querySelectorAll(".js-scroll-stagger");

  if (containers.length === 0) return;

  containers.forEach((container) => {
    const elements = container.querySelectorAll(".js-scroll-fade-in");

    if (elements.length === 0) return;

    // PCサイズ（900px以上）: 順番に表示（stagger）
    ScrollTrigger.matchMedia({
      "(min-width: 900px)": () => {
        elements.forEach((element) => {
          gsap.set(element, {
            opacity: 0,
            y: 20,
          });
        });

        gsap.to(elements, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.3, // 0.3秒ずつずらして表示
          scrollTrigger: {
            trigger: container,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        });
      },

      // SPサイズ（900px未満）: 個別に表示
      "(max-width: 899px)": () => {
        elements.forEach((element) => {
          gsap.set(element, {
            opacity: 0,
            y: 20,
          });

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
      },
    });
  });
}
