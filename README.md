# workshop_4
link:https://pluto278.github.io/workshop_4

# tasks
- Create an interactive p5.js sketch with at least three different types of user input events.
- Implement a way to record and redeploy user input.
- Enhance the user experience with interactive elements such as buttons.
- Allow the ball to move towards a clicked position or randomly jump when clicked.
- Enable users to drag and drop cookies around the canvas.
- Track user input (such as dragging cookies and the number of cookies eaten) to influence the game state.

# notes

## 1.Mouse Interactions
Mouse Click
Triggers the ball to move toward a target position or randomly jump, displaying the message "Don't touch him."
```
function mousePressed() {
  if (!isGameOver && !targetPos && !isDraggingCookie()) {
    targetPos = createVector(mouseX, mouseY);
    isMoving = true;
    moveStartTime = millis();
  }
}
```
Clicking on the ball causes it to jump to a random position and display a message.
```
if (dist(mouseX, mouseY, ball.x, ball.y) < ball.size / 2) {
  ball.x = random(width);
  ball.y = random(height);
  shyMessage = "Don't touch him, you have a shy pet";
  shyMessageTime = millis();
}
```
Mouse Drag
Allows users to drag cookies and release them at different positions.
```
function mouseReleased() {
  for (let cookie of cookies) {
    cookie.isDragging = false;
  }
}
```
This ensures that users can move cookies by clicking and dragging, then releasing the mouse to drop them in place.

## 2. Tracking User Input
Cookie Status Tracking
Records the number of cookies added by the player.
Tracks the number of cookies eaten by the ball and displays a "No more cookies" message when the limit is reached.

## 3. Additional Game Mechanics
Ball Movement
When the user clicks on the canvas, the ball moves toward the clicked position and stops after 3 seconds.
```
if (millis() - moveStartTime > 3000) {
  targetPos = null;
  isMoving = false;
}
```
Game Over Condition
If the user tries to add more than 3 cookies, the game enters a "Game Over" state and displays a warning message.
```
function addCookie() {
  if (cookiesEaten < 3) {
    cookies.push({ x: random(width), y: random(height), isDragging: false });
  } else {
    isGameOver = true;
  }
}
```
