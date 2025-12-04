/**
 * ヘッダーのアニメーション機能
 * KVがビューポート上端から完全に出て見えなくなったらヘッダーが上部から表示される
 * KVがビューポートに戻ってきたらヘッダーを上に隠す
 */
export function initializeHeaderAnimation() {
  // ヘッダー要素の取得
  const header = document.querySelector(".l-header");
  // KVエリアの取得（トップ or ページ共通）
  const kv =
    document.querySelector(".top-kv") || document.querySelector(".c-page-kv");

  // ヘッダーまたはKVがない場合は何もしない
  if (!header || !kv) {
    return;
  }

  // ヘッダーを表示する関数
  const showHeader = () => {
    gsap.killTweensOf(header);

    // ヘッダーに表示用クラス付与
    if (!header.classList.contains("l-header--page")) {
      header.classList.add("l-header--page");
    }

    // 固定表示とスタイル
    header.style.position = "fixed";
    header.style.top = "0";
    header.style.left = "0";
    header.style.backgroundColor =
      "color-mix(in srgb, var(--color-bg-extra-light) 80%, transparent)";

    // アニメーションで上から表示
    gsap.fromTo(
      header,
      { y: "-100%" },
      { y: "0%", duration: 0.3, ease: "power2.out" }
    );
  };

  // ヘッダーを非表示にする関数
  const hideHeader = () => {
    gsap.killTweensOf(header);

    // アニメーションで上に隠す
    gsap.to(header, {
      y: "-100%",
      duration: 0.3,
      ease: "power2.out",
      onComplete: () => {
        // トップページのときのみクラス削除
        if (
          header.classList.contains("l-header--page") &&
          document.querySelector(".top-kv")
        ) {
          header.classList.remove("l-header--page");
        }
        // スタイルリセット
        header.style.position = "absolute";
        header.style.top = "0";
        header.style.backgroundColor = "";
        gsap.set(header, { clearProps: "transform" });
      },
    });
  };

  // スクロール位置に応じてイベントを設定
  ScrollTrigger.create({
    trigger: kv,
    start: "bottom top",
    end: "top top",
    onEnter: showHeader, // KVが完全に上に消えたとき
    onLeaveBack: hideHeader, // KVが下から戻ってきたとき
  });
}
