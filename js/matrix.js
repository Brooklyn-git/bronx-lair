const canvas = document.getElementById('matrix-rain');
const ctx = canvas.getContext('2d');

let cols, drops;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  cols = Math.floor(canvas.width / 14);
  drops = Array.from({ length: cols }, () => Math.floor(Math.random() * -canvas.height / 16));
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789';

function drawRain() {
  ctx.fillStyle = 'rgba(10,10,10,0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = '14px monospace';
  for (let i = 0; i < cols; i++) {
    const char = chars[Math.floor(Math.random() * chars.length)];
    const x = i * 14;
    const y = drops[i] * 16;
    ctx.fillStyle = y > 0 ? '#00ff41' : '#005a1a';
    ctx.globalAlpha = y > 0 ? 0.35 : 0.12;
    ctx.fillText(char, x, y);
    ctx.globalAlpha = 1;
    if (y > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

setInterval(drawRain, 50);
