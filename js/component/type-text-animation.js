/**
 * タイプライター風テキストアニメーション機能
 * HTML要素に .js-top-type-text クラスを追加するだけで使用可能
 * SplitTextライブラリを使用してテキストを1文字ずつ分割し、順番に表示
 * トップページはローディングアニメーション完了後に実行される
 */
export function initializeTypeTextAnimation() {
  // 必要なライブラリが読み込まれているか確認
  if (
    typeof gsap === "undefined" ||
    typeof ScrollTrigger === "undefined" ||
    typeof SplitText === "undefined"
  ) {
    return;
  }

  // ScrollTriggerとSplitTextをGSAPに登録
  gsap.registerPlugin(ScrollTrigger, SplitText);

  const typeText = document.querySelectorAll(".js-type-text");

  if (typeText.length === 0) return;

  // 初期状態: ローディング完了まで要素全体を非表示にする
  gsap.set(typeText, { opacity: 0 });

  // アニメーションを設定する関数
  const setupAnimation = () => {
    // 各要素に対してアニメーションを設定
    typeText.forEach((item) => {
      // SplitTextでテキストを1文字ずつ分割
      const splitText = new SplitText(item, { type: "chars" });
      const chars = splitText.chars;

      // 先に各文字を非表示にしてから、要素全体を表示
      // これにより、一瞬全体が表示されることを防ぐ
      gsap.set(chars, {
        opacity: 0,
      });

      // 各文字を非表示にした後、要素全体を表示
      gsap.set(item, {
        opacity: 1,
      });

      // ScrollTriggerでスクロール時にアニメーション実行
      ScrollTrigger.create({
        trigger: item,
        start: "top 70%",
        onEnter: () => {
          gsap.to(chars, {
            opacity: 1,
            stagger: 0.06, // ここを調整すると「打ってる感」が変わる
            ease: "none",
          });
        },
      });
    });
  };

  // ローディング要素が存在するか確認
  const loadingElement = document.querySelector(".js-top-loading");

  if (loadingElement) {
    // ローディングアニメーション完了を待つ
    // top-loading-animation.jsでフェードアウト完了時に発火される
    // "loadingComplete"カスタムイベントを待ち受け、発火されたらsetupAnimation()を実行
    window.addEventListener("loadingComplete", setupAnimation, { once: true });
  } else {
    // ローディング要素がない場合は、ページ読み込み完了後に実行
    window.addEventListener("load", setupAnimation, { once: true });
  }
}
