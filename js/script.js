// --------------------------
// スライダー + カラー切替
// --------------------------
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

const slideColors = [
  "#D9D9D9",   // グレー
  "#78C267",   // 黄緑（人気カラー）
  "#8B1C3B",   // ワインレッド（やる気）
  "#000000",   // 黒（決断）
  "#F5F5DC"    // ベージュ（精神安定）
];

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
    dots[i].classList.toggle('active', i === index);
    slide.style.backgroundColor = slideColors[i % slideColors.length];
  });
}

function nextSlide() {
  slideIndex = (slideIndex + 1) % slides.length;
  showSlide(slideIndex);
}

// 初期表示 + 自動再生
showSlide(slideIndex);
setInterval(nextSlide, 5000);

// ドットクリック対応
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
// Aboutセクションの色とテキスト変更
const aboutPhoto = document.querySelector('.about-photo');
const iconBoxes = document.querySelectorAll('.icon-box');
const aboutTexts = document.querySelectorAll('.about-text p');

// ホバー時に表示したいテキスト（index対応）
const hoverTexts = [
  "テテテテテテテテテテテテテテテテ",  // icon1
  "キキキキキキキキキキキキキキキキ",  // icon2
  "スススススススススススススススス",  // icon3
  "トトトトトトトトトトトトトトトト"   // icon4
];

iconBoxes.forEach((icon, index) => {
  icon.addEventListener('mouseenter', () => {
    const color = getComputedStyle(icon).backgroundColor;
    aboutPhoto.style.backgroundColor = color;

    // テキストを変更
    aboutTexts.forEach(p => {
      p.textContent = hoverTexts[index];
    });
  });

  icon.addEventListener('mouseleave', () => {
    aboutPhoto.style.backgroundColor = '#D9D9D9';

    // 元のテキストに戻す
    aboutTexts.forEach(p => {
      p.textContent = "テキストテキストテキストテキストテキストテキストテキストテキスト";
    });
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
