(function () {
  if (document.getElementById('slap-ai-btn')) return;

  const messages = [
    "Snap out of it. Back to the actual question.",
    "Focus! Context restored.",
    "That's enough drifting. Stay on topic.",
    "Wake up and answer the real question.",
    "Recentered. Try again, AI.",
    "No more hallucinating. Straighten up."
  ];

  // Flash overlay
  const flash = document.createElement('div');
  flash.id = 'slap-ai-flash';
  document.documentElement.appendChild(flash);

  // Toast
  const toast = document.createElement('div');
  toast.id = 'slap-ai-toast';
  document.documentElement.appendChild(toast);

  // Button
  const btn = document.createElement('button');
  btn.id = 'slap-ai-btn';
  btn.title = 'Slap the AI back on track';

  const img = document.createElement('img');
  img.src = chrome.runtime.getURL('images/hand.png');
  img.alt = 'Slap';
  btn.appendChild(img);

  document.documentElement.appendChild(btn);

  let cooldown = false;

  btn.addEventListener('click', () => {
    if (cooldown) return;
    cooldown = true;

    // Hand slap animation
    btn.classList.remove('slapping');
    void btn.offsetWidth; // restart animation
    btn.classList.add('slapping');

    // Screen flash
    flash.classList.remove('active');
    void flash.offsetWidth;
    flash.classList.add('active');

    // Page shake
    document.body.classList.remove('slap-ai-shake');
    void document.body.offsetWidth;
    document.body.classList.add('slap-ai-shake');

    // Toast message
    const msg = messages[Math.floor(Math.random() * messages.length)];
    toast.textContent = msg;
    toast.classList.add('show');

    setTimeout(() => {
      document.body.classList.remove('slap-ai-shake');
    }, 400);

    setTimeout(() => {
      toast.classList.remove('show');
    }, 1800);

    setTimeout(() => {
      cooldown = false;
    }, 500);
  });
})();
