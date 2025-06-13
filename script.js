const cube = document.getElementById('cube');
const cubeWrapper = document.querySelector('.cube-wrapper');


let autoRotateX = 0;
let autoRotateY = 0;
let currentX = 0;
let currentY = 0;
let isHovering = false;

let hasResonated = false;
let resetTimeout;
let resonanceTimeout;
let isResonating = false;

// 自動回転（ホバーしていないとき）
function autoRotate() {
  if (!isHovering && !isResonating) {
    autoRotateX += 0.3;
    autoRotateY += 0.3;
    currentX = autoRotateX;
    currentY = autoRotateY;
    updateTransform();
  }
  requestAnimationFrame(autoRotate);
}
autoRotate();

// ホバー中のマウス移動で自由回転
let hoverTimer = null;
let leaveTimeout = null;
let resonanceActive = false;

document.addEventListener('mousemove', (e) => {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const deltaX = e.clientX - centerX;
  const deltaY = e.clientY - centerY;

  // --- マウス追従による回転 ---
  if (isHovering) {
    currentY += deltaX * 0.02;
    currentX -= deltaY * 0.02;
    updateTransform();
  }

  // --- 中央20%共鳴判定 ---
  const distX = Math.abs(deltaX);
  const distY = Math.abs(deltaY);
  const radiusX = window.innerWidth * 0.2 / 2;
  const radiusY = window.innerHeight * 0.2 / 2;

  if (distX <= radiusX && distY <= radiusY) {
    // マウスが中央20％内
    if (!hoverTimer && !resonanceActive) {
      hoverTimer = setTimeout(() => {
        resonanceActive = true;
        document.body.style.backgroundColor = '#fff';
        hoverTimer = null;
      }, 1000);
    }
    if (leaveTimeout) {
      clearTimeout(leaveTimeout);
      leaveTimeout = null;
    }
  } else {
    // 中央外に出た
    if (hoverTimer) {
      clearTimeout(hoverTimer);
      hoverTimer = null;
    }
    if (resonanceActive && !leaveTimeout) {
      leaveTimeout = setTimeout(() => {
        resonanceActive = false;
        document.body.style.backgroundColor = '#000';
        leaveTimeout = null;
      }, 500);
    }
  }
});



// ホバー状態を管理
cube.addEventListener('mouseenter', () => {
  isHovering = true;
  clearTimeout(resetTimeout);
});
cube.addEventListener('mouseleave', () => {
  isHovering = false;
  autoRotateX = currentX;
  autoRotateY = currentY;

  clearTimeout(resonanceTimeout);
  stopResonance(true); // 強制停止
});

// 回転適用
function updateTransform() {
  cube.style.setProperty('--current-x', `${currentX}deg`);
  cube.style.setProperty('--current-y', `${currentY}deg`);
  cube.style.transform = `rotateX(${currentX}deg) rotateY(${currentY}deg)`;
}


// === 中央から20%の共鳴検出 ===
const centerThreshold = Math.min(window.innerWidth, window.innerHeight) * 0.2;

document.addEventListener('mousemove', (e) => {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);

  if (dist < centerThreshold) {
    if (!isResonating) {
      startResonance(); // 揺れを即時開始
    }

    if (!hasResonated && !resonanceTimeout) {
      resonanceTimeout = setTimeout(() => {
        document.body.style.backgroundColor = '#fff'; // 1秒経過で白に変化
        hasResonated = true;
      }, 1000);
    }
  } else {
    clearTimeout(resonanceTimeout);
    stopResonance(false); // 揺れ止め＆背景戻し処理
  }
});

// === 揺れ処理 ===
function startResonance() {
  isResonating = true;
  cube.classList.add('shake');

  // 3秒後に背景変化 & 揺れストップ
  resonanceTimeout = setTimeout(() => {
    document.body.style.backgroundColor = '#fff'; // 背景を白に
    hasResonated = true;
    stopResonance(false); // 揺れ止め
  }, 3000);
}

function stopResonance(forceReset) {
  if (!isResonating) return;

  isResonating = false;
  cube.classList.remove('shake');
  clearTimeout(resonanceTimeout);
  resonanceTimeout = null;

  if (hasResonated || forceReset) {
    resetTimeout = setTimeout(() => {
      document.body.style.backgroundColor = '#000'; // 背景を黒に戻す
      hasResonated = false;
    }, 500);
  }
}
