import { initializeHamburgerMenu } from "./component/hamburgermenu.js";
import { initializeAboutStaffSplide } from "./component/about-staff-splide.js";
import { initializeRecruitCultureSplide } from "./component/recruit-culture-splide.js";
import { initializeHeaderAnimation } from "./component/header-animation.js";
import { initializeScrollAnimation } from "./component/scroll-animation.js";
import { initializeScrollStaggerAnimation } from "./component/scroll-stagger-animation.js";
import { initializeTypeTextAnimation } from "./component/type-text-animation.js";
import { initializeTopLoadingAnimation } from "./component/top-loading-animation.js";

// ScrollTriggerをGSAPに登録
if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ローディングアニメーションの初期化（最初に実行）
initializeTopLoadingAnimation();

// 各機能の初期化
initializeHamburgerMenu();

// スライダーの初期化
initializeAboutStaffSplide();
initializeRecruitCultureSplide();

// ヘッダーアニメーションの初期化
initializeHeaderAnimation();

// スクロールアニメーションの初期化
initializeScrollAnimation();

// 順番表示アニメーションの初期化（PCサイズのみ）
initializeScrollStaggerAnimation();

// タイプライター風テキストアニメーションの初期化
// ローディングアニメーションがある場合、完了後に実行される（type-text-animation.js内で制御）
initializeTypeTextAnimation();
