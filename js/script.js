// --------------------------
// スライダー + カラー切替 + ドット対応
// --------------------------
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

// カラーリスト（本番では src に差し替え可能）
const slideColors = [
  "#D9D9D9",   
  "#78C267",   
  "#8B1C3B",   
  "#000000",   
  "#F5F5DC"    
];

// スライドを表示する関数
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    dots[i].classList.remove('active');
    
    if (i === index) {
      slide.classList.add('active');
      dots[i].classList.add('active');
    }

    // テスト時は背景色で切替
    slide.style.backgroundColor = slideColors[i % slideColors.length];
  });
}

// 次のスライドへ
function nextSlide() {
  slideIndex = (slideIndex + 1) % slides.length;
  showSlide(slideIndex);
}

// 初期表示
showSlide(slideIndex);

// 自動再生（5秒ごと）
setInterval(nextSlide, 5000);

// ドットクリックで手動切替
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    slideIndex = i;
    showSlide(slideIndex);
  });
});


// --------------------------
// ハンバーガーメニュー
// --------------------------
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  hamburger.classList.toggle('active');
});

// メニュー外クリックで閉じる
document.addEventListener('click', (e) => {
  if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
  }
});

// 仮カーソル要素を作成
const cursor = document.createElement('div');
cursor.className = 'view-cursor';
cursor.textContent = 'View';
document.body.appendChild(cursor);

// マウス移動で追従
document.addEventListener('mousemove', (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

// ホバー時だけ表示
const workItems = document.querySelectorAll('.work-item');
workItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    cursor.style.opacity = 1;
  });
  item.addEventListener('mouseleave', () => {
    cursor.style.opacity = 0;
  });
});
// Aboutセクションの色とテキスト変更（安定動作版）
const aboutPhoto = document.querySelector('.about-photo img');
const iconBoxes = document.querySelectorAll('.icon-box');
const aboutText = document.querySelector('.about-text p');

const hoverTexts = [
  `Webサイトの構成・デザイン<br>コーディングまで<br>一貫して対応可能です。<br>ユーザー視点を大切にしながら<br>世界観や想いを<br>形にすることを心がけています。<br>丁寧なヒアリングと柔軟な対応で<br>伝えたい人に「伝わる」デザインを<br>ご提案します。<br>見た目だけでなく中身のある構築を<br>目指して制作しています。`
,  // icon1
  `Premiere Proを用いた<br>カット・テロップ・BGM挿入など<br>基本編集はもちろん<br>ナレーションや構成を含めた制作も<br>ご相談いただけます。<br>現在も継続案件にて<br>編集を担当中です。<br>伝えたいこと・魅せたい雰囲気を<br>丁寧に拾い上げ<br>想いが届くような動画を<br>心を込めて仕上げています。`
,       // icon2
  `AndroidStudioで<br>ゲームや便利ツールなどを<br>複数開発。<br>企画・設計・UI構築・テストまで<br>一人で完結可能です。<br>未公開も含めて<br>7件以上の作品に携わってきました。<br>遊び心と実用性を兼ね備えた<br>アプリづくりを目指しています。<br>開発を通じて<br>ユーザーと繋がる事が喜びです。`
,                      // icon3
  `年間500件以上のべ5万枚以上の<br>写真撮影をしてきました。<br>人物・商品・自然風景など<br>被写体に応じた魅せ方を<br>意識しています。<br>その瞬間にある<br>「らしさ」や「心の動き」を<br>捉えることを大切に<br>シャッターを切っています。<br>制作業務と並行しながら<br>現在も撮影可能です。`
           // icon4
];

// 元の自己紹介テキスト（HTMLタグあり）

// 元の自己紹介テキストを取得（HTMLから直接）
const originalText = aboutText.innerHTML;

// ホバー処理
iconBoxes.forEach((icon, index) => {
  icon.addEventListener('mouseenter', () => {
    aboutPhoto.src = icon.getAttribute('data-src');
    aboutPhoto.alt = icon.getAttribute('data-alt');

    // テキストアニメーション
    aboutText.classList.remove('animate');
    void aboutText.offsetWidth; // 再適用用
    aboutText.innerHTML = hoverTexts[index];
    aboutText.classList.add('animate');

    // 背景色
    const color = getComputedStyle(icon).backgroundColor;
    icon.closest('.about-content').querySelector('.about-photo').style.backgroundColor = color;
  });

  icon.addEventListener('mouseleave', () => {
    // 元に戻す
    aboutPhoto.src = 'image/me1.jpg';
    aboutPhoto.alt = 'me1';
    aboutText.classList.remove('animate');
    void aboutText.offsetWidth;
    aboutText.innerHTML = originalText;
    aboutText.classList.add('animate');
    icon.closest('.about-content').querySelector('.about-photo').style.backgroundColor = '#D9D9D9';
  });
});

// 各 work-item ホバー時に見出しの border-left を変更
document.querySelectorAll('.work-category').forEach(category => {
  const subtitle = category.querySelector('.work-subtitle');
  const items = category.querySelectorAll('.work-item');

  // 各カテゴリに対応した色を取得（subtitle にクラスで渡されている前提）
  let color = '#78C267'; // デフォルト（人気カラー）

  if (subtitle.classList.contains('work-motivation')) {
    color = '#8B1C3B';
  } else if (subtitle.classList.contains('work-decision')) {
    color = '#000000';
  } else if (subtitle.classList.contains('work-stable')) {
    color = '#F5F5DC';
  }

  items.forEach(item => {
    item.addEventListener('mouseenter', () => {
      subtitle.style.borderLeftColor = color;
    });
    item.addEventListener('mouseleave', () => {
      subtitle.style.borderLeftColor = '#78C267'; // 元の緑に戻す（固定ならここを維持）
    });
  });
});
