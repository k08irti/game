score = 0;
cross = true;

audio = new Audio("k2.mp3");
audiogo = new Audio("k1.mp3");
setTimeout(() => {
  audio.play();
}, 1000);  
document.addEventListener("click", () => {
    audio.play().catch(err => console.log("🔇 Audio play blocked:", err));
    audio.loop = true; // Keep background music looping
});

document.onkeydown = function (e) {
  console.log("key code:", e.keyCode);
  if (e.keyCode == 38) {
    pika = document.querySelector(".pika");
    pika.classList.add("animatePika");
    setTimeout(() => {
      pika.classList.remove("animatePika");
    }, 700);
  }
  if (e.keyCode == 39) {
    pika = document.querySelector(".pika");
    pikaX = parseInt(
      window.getComputedStyle(pika, null).getPropertyValue("left")
    );
    pika.style.left = pikaX + 112 + "px";
  }
  if (e.keyCode == 37) {
    pika = document.querySelector(".pika");
    pikaX = parseInt(
      window.getComputedStyle(pika, null).getPropertyValue("left")
    );
    pika.style.left = pikaX - 112 + "px";
  }
};

setInterval(() => {
  pika = document.querySelector(".pika");
  gameOver = document.querySelector(".gameOver");
  obstacle = document.querySelector(".obstacle");

  dx = parseInt(window.getComputedStyle(pika, null).getPropertyValue("left"));
  dy = parseInt(window.getComputedStyle(pika, null).getPropertyValue("top"));
  ox = parseInt(
    window.getComputedStyle(obstacle, null).getPropertyValue("left")
  );
  oy = parseInt(
    window.getComputedStyle(obstacle, null).getPropertyValue("top")
  );

  offsetX = Math.abs(dx - ox);
  offsetY = Math.abs(dy - oy);

  if (offsetX < 72 && offsetY < 53) {
    gameOver.innerHTML = "Game Over - Reload to play";
    obstacle.classList.remove("obstacleAni");
    audiogo.play();
    setTimeout(() => {
      audiogo.pause();
      audio.pause();
    }, 1000);
  } else if (offsetX < 113 && cross) {
    score += 1;
    updateScore(score);
    cross = false;
    setTimeout(() => {
      cross = true;
    }, 1000);
    setTimeout(() => {
      aniDur = parseFloat(
        window
          .getComputedStyle(obstacle, null)
          .getPropertyValue("animation-duration")
      );
      newDur = aniDur - 0.1;
      obstacle.style.animationDuration = newDur + "s";
    }, 500);
  }
}, 10);

function updateScore(score) {
  scoreCont.innerHTML = "Your Score: " + score;
}
