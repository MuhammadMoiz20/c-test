(function () {
  const countEl = document.getElementById('count');
  const btn = document.getElementById('count-btn');
  if (!countEl || !btn) return;

  let count = 0;
  const update = () => {
    countEl.textContent = String(count);
  };
  update();

  btn.addEventListener('click', () => {
    count += 1;
    update();
  });
})();
