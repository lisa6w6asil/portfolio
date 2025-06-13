const cube = document.getElementById('cube');

let autoRotateX = 0;
let autoRotateY = 0;
let currentX = 0;
let currentY = 0;
let isHovering = false;

// 自動回転（ホバーしていないとき）
function autoRotate() {
  if (!isHovering) {
    autoRotateY += 0.3;
    currentX = autoRotateX;
    currentY = autoRotateY;
    updateTransform();
  }
  requestAnimationFrame(autoRotate);
}
autoRotate();

// ホバー検出（ホバー中はマウス移動で自由に回転）
document.addEventListener('mousemove', (e) => {
  if (!isHovering) return;

  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const deltaX = e.clientX - centerX;
  const deltaY = e.clientY - centerY;

  currentY += deltaX * 0.03; // Y軸回転は制限なし
  currentX -= deltaY * 0.03;

  // X軸回転を制限（上下反転防止）
  currentX = Math.min(90, Math.max(-90, currentX));

  updateTransform();
});


// ホバー状態を管理
cube.addEventListener('mouseenter', () => {
  isHovering = true;
});
let revertTimeout = null;

cube.addEventListener('mouseleave', () => {
  isHovering = false;
  autoRotateX = currentX;
  autoRotateY = currentY;

  clearTimeout(revertTimeout);
  revertTimeout = setTimeout(() => {
    document.body.style.backgroundColor = '#000'; // ← 元の背景色（白）に戻す
  }, 500);
});


// 回転を適用
function updateTransform() {
  cube.style.transform = `rotateX(${currentX}deg) rotateY(${currentY}deg)`;
}
// === 共鳴エフェクト（中央30%範囲で背景色変化） ===
let resonanceTimeout = null;
let isResonating = false;

document.addEventListener('mousemove', (e) => {
  if (!isHovering) return;

  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const maxRadius = Math.min(window.innerWidth, window.innerHeight) * 0.5;

  const distance = Math.sqrt(
    Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
  );

  if (distance < maxRadius) {
    if (!resonanceTimeout && !isResonating) {
      resonanceTimeout = setTimeout(() => {
        document.body.style.transition = 'background-color 1.5s ease';
        document.body.style.backgroundColor = '#f0f4ff'; // 共鳴カラー
        isResonating = true;
      }, 1000); // ← ここを1秒に変更
    }
  } else {
    clearTimeout(resonanceTimeout);
    resonanceTimeout = null;

    if (isResonating) {
      document.body.style.backgroundColor = '#ffffff';
      isResonating = false;
    }
  }
});

const miniCard = document.getElementById('mini-card');
let hoverTimeout = null;

const faceInfo = {
  front: 'WEBデザインに関する詳細情報',
  back: 'グラフィックスに関する詳細情報',
  right: '動画編集に関する詳細情報',
  left: 'カメラに関する詳細情報',
  top: 'ライティングに関する詳細情報',
  bottom: 'Aboutページの詳細情報',
};

// 面ごとのイメージカラー（例）
const faceColors = {
  front: '#ff6f61',    // WEBデザイン：赤系
  back: '#6a9fb5',     // グラフィックス：青系
  right: '#f4a261',    // 動画編集：オレンジ系
  left: '#2a9d8f',     // カメラ：緑系
  top: '#e9c46a',      // ライティング：黄色系
  bottom: '#264653',   // About：紺系
};

document.querySelectorAll('.face').forEach(face => {
  face.addEventListener('mousemove', (e) => {
    const rect = face.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rangeX = rect.width * 0.2 / 2;
    const rangeY = rect.height * 0.2 / 2;

    if (
      e.clientX >= centerX - rangeX &&
      e.clientX <= centerX + rangeX &&
      e.clientY >= centerY - rangeY &&
      e.clientY <= centerY + rangeY
    ) {
      if (!hoverTimeout) {
        hoverTimeout = setTimeout(() => {
          const faceClass = Array.from(face.classList).find(c =>
            Object.keys(faceInfo).includes(c)
          );
          if (faceClass) {
            miniCard.textContent = faceInfo[faceClass];
            miniCard.classList.add('visible');
            // 面ごとのイメージカラーに背景色変更
            document.body.style.backgroundColor = faceColors[faceClass];
          }
        }, 500);
      }
    } else {
      clearTimeout(hoverTimeout);
      hoverTimeout = null;
      miniCard.classList.remove('visible');
      document.body.style.backgroundColor = '#000'; // 元に戻す
    }
  });

  face.addEventListener('mouseleave', () => {
    clearTimeout(hoverTimeout);
    hoverTimeout = null;
    miniCard.classList.remove('visible');
    document.body.style.backgroundColor = '#000'; // 元に戻す
  });
});
