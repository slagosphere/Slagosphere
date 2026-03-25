JavaScript

/* script.js */
document.addEventListener("DOMContentLoaded",() => {
const canvas = document.getElementById("bg");
  if (!canvas) return;
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function createParticle() {
  const isBalaclava = Math.random() < 0.15;

  particles.push({
    x: Math.random() * canvas.width,
    y: canvas.height + 20,
    size: Math.random() * 15 + 10,
    speed: Math.random() * 0.7 + 0.3,
    type: isBalaclava ? "balaclava" : "heart"
  });
}

function drawHeart(x, y, size) {
  ctx.fillStyle = "rgba(255,105,180,0.6)";
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.bezierCurveTo(x, y - size, x - size, y - size, x - size, y);
  ctx.bezierCurveTo(x - size, y + size, x, y + size * 1.5, x, y + size * 2);
  ctx.bezierCurveTo(x, y + size * 1.5, x + size, y + size, x + size, y);
  ctx.bezierCurveTo(x + size, y - size, x, y - size, x, y);
  ctx.fill();
}

function drawBalaclava(x, y, size) {
  ctx.fillStyle = "rgba(0,0,0,0.7)";
  ctx.fillRect(x, y, size, size * 1.5);

  ctx.fillStyle = "#ffd6e7";
  ctx.fillRect(x + size*0.25, y + size*0.4, size*0.2, size*0.2);
  ctx.fillRect(x + size*0.6, y + size*0.4, size*0.2, size*0.2);
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (Math.random() < 0.04) createParticle();

  particles.forEach((p, i) => {
    p.y -= p.speed;

    if (p.type === "heart") drawHeart(p.x, p.y, p.size);
    else drawBalaclava(p.x, p.y, p.size);

    if (p.y < -50) particles.splice(i, 1);
  });

  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
