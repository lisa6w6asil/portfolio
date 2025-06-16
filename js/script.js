const mainVisual = document.getElementById('mainvisual');
const centerText = document.getElementById('center-text');
const items = document.querySelectorAll('.menu-item');

items.forEach(item => {
  item.addEventListener('mouseenter', () => {
    const color = item.getAttribute('data-color');
    const text = item.getAttribute('data-text');
    mainVisual.style.backgroundColor = color;
    centerText.textContent = text;
  });

  item.addEventListener('mouseleave', () => {
    mainVisual.style.backgroundColor = '#ffffff';
    centerText.textContent = 'テキスト';
  });
});

const menuItems = document.querySelectorAll('.menu-item');
const hoverDesc = document.getElementById('hover-description');

menuItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    const description = item.getAttribute('data-description');
    hoverDesc.textContent = description;
    hoverDesc.style.display = 'block';
  });
  item.addEventListener('mouseleave', () => {
    hoverDesc.style.display = 'none';
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("active");
    });
  }
});
