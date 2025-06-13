<script>
  const bg = document.getElementById('bg-image');
  const centerText = document.getElementById('center-text');
  const items = document.querySelectorAll('.menu-item');

  items.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const img = item.getAttribute('data-image');
      const text = item.getAttribute('data-text');
      bg.style.backgroundImage = `url(${img})`;
      centerText.textContent = text;
    });
  });
</script>
