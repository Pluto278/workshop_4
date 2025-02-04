let ball;
let cookies = [];
let targetPos;
let isMoving = false;
let moveStartTime;
let cookiesEaten = 0;
let isGameOver = false;
let shyMessage = "";
let shyMessageTime = 0;

function setup() {
  createCanvas(800, 600);

  // 初始化球
  ball = {
    x: width / 2,
    y: height / 2,
    size: 50,
    speed: 2,
  };

  // 创建按钮
  createButton('Restart').position(10, 10).mousePressed(restartGame);
  createButton('More Cookies').position(100, 10).mousePressed(addCookie);
}

function draw() {
  background(220);

  // 绘制球
  fill(0, 0, 255);
  noStroke();
  ellipse(ball.x, ball.y, ball.size);

  // 显示 "Come here" 文本
  if (targetPos && !isGameOver) {
    fill(0);
    textSize(20);
    text("Come here", targetPos.x, targetPos.y - 20);

    // 球向目标位置移动
    if (isMoving) {
      let dx = targetPos.x - ball.x;
      let dy = targetPos.y - ball.y;
      let distance = dist(ball.x, ball.y, targetPos.x, targetPos.y);

      if (distance > 1) {
        ball.x += (dx / distance) * ball.speed;
        ball.y += (dy / distance) * ball.speed;
      } else {
        isMoving = false;
      }
    }

    // 3秒后停止移动
    if (millis() - moveStartTime > 3000) {
      targetPos = null;
      isMoving = false;
    }
  }

  // 绘制饼干
  for (let i = cookies.length - 1; i >= 0; i--) {
    let cookie = cookies[i];
    fill(210, 180, 140);
    ellipse(cookie.x, cookie.y, 30, 30);

    // 拖动饼干
    if (cookie.isDragging) {
      cookie.x = mouseX;
      cookie.y = mouseY;
    }

    // 检查饼干是否被球吃掉
    if (dist(cookie.x, cookie.y, ball.x, ball.y) < ball.size / 2 + 15) {
      cookies.splice(i, 1);
      cookiesEaten++;
    }
  }

  // 显示 "No more cookies" 信息
  if (isGameOver) {
    fill(0);
    textSize(24);
    text("No more cookies, unless you want a fat pet", 100, height / 2);
  }

  // 显示 "Don't touch him" 信息
  if (shyMessage) {
    fill(0);
    textSize(20);
    text(shyMessage, ball.x - 50, ball.y - 40);

    // 1秒后消失
    if (millis() - shyMessageTime > 1000) {
      shyMessage = "";
    }
  }
}

function mousePressed() {
  // 点击画布显示 "Come here" 并让球移动
  if (!isGameOver && !targetPos && !isDraggingCookie()) {
    targetPos = createVector(mouseX, mouseY);
    isMoving = true;
    moveStartTime = millis();
  }

  // 点击球随机移动
  if (dist(mouseX, mouseY, ball.x, ball.y) < ball.size / 2) {
    ball.x = random(width);
    ball.y = random(height);
    shyMessage = "Don't touch him, you have a shy pet";
    shyMessageTime = millis();
  }

  // 检查是否点击了饼干
  for (let cookie of cookies) {
    if (dist(mouseX, mouseY, cookie.x, cookie.y) < 15) {
      cookie.isDragging = true;
    }
  }
}

function mouseReleased() {
  // 停止拖动饼干
  for (let cookie of cookies) {
    cookie.isDragging = false;
  }
}

function addCookie() {
  if (cookiesEaten < 3) {
    cookies.push({ x: random(width), y: random(height), isDragging: false });
  } else {
    isGameOver = true;
  }
}

function restartGame() {
  cookies = [];
  cookiesEaten = 0;
  isGameOver = false;
  targetPos = null;
  isMoving = false;
  shyMessage = "";
  ball.x = width / 2;
  ball.y = height / 2;
}

function isDraggingCookie() {
  for (let cookie of cookies) {
    if (cookie.isDragging) {
      return true;
    }
  }
  return false;
}