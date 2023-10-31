<!DOCTYPE html>
<html>
  <head>
    <title>Complex Snake Game</title>
    <style>
      body {
        background: #000;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
      }
      canvas {
        border: 1px solid white;
      }
    </style>
  </head>
  <body>
    <canvas id="snakeGame" width="800" height="600"></canvas>
    <script>
      const canvas = document.getElementById('snakeGame');
      const context = canvas.getContext('2d');
      const box = 40;
      let snake = [];
      snake[0] = { x: 10 * box, y: 10 * box };
      let food = {
          x: Math.floor(Math.random() * 20) * box,
          y: Math.floor(Math.random() * 20) * box
      };
      let d;

      document.addEventListener('keydown', direction);
      document.addEventListener('touchstart', handleTouchStart, false);
      document.addEventListener('touchmove', handleTouchMove, false);

      var xDown = null;                                                        
      var yDown = null;

      function handleTouchStart(evt) {                                         
          xDown = evt.touches[0].clientX;                                      
          yDown = evt.touches[0].clientY;                                      
      };                                                

      function handleTouchMove(evt) {
          if ( ! xDown || ! yDown ) {
              return;
          }

          var xUp = evt.touches[0].clientX;                                    
          var yUp = evt.touches[0].clientY;

          var xDiff = xDown - xUp;
          var yDiff = yDown - yUp;

          if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
              if ( xDiff > 0 ) {
                  /* left swipe */ 
                  d = 'LEFT';
              } else {
                  /* right swipe */
                  d = 'RIGHT';
              }                       
          } else {
              if ( yDiff > 0 ) {
                  /* up swipe */ 
                  d = 'UP';
              } else { 
                  /* down swipe */
                  d = 'DOWN';
              }                                                                 
          }
          /* reset values */
          xDown = null;
          yDown = null;                                             
      };

      function direction(event) {
          if (event.keyCode == 37 && d != 'RIGHT') d = 'LEFT';
          if (event.keyCode == 38 && d != 'DOWN') d = 'UP';
          if (event.keyCode == 39 && d != 'LEFT') d = 'RIGHT';
          if (event.keyCode == 40 && d != 'UP') d = 'DOWN';
      }

      function draw() {
          context.fillStyle = "#000000";
          context.fillRect(0, 0, canvas.width, canvas.height);
          for (let i = 0; i < snake.length; i++) {
              context.fillStyle = (i == 0) ? 'green' : 'white';
              context.fillRect(snake[i].x, snake[i].y, box/2, box/2);
              context.strokeStyle = 'red';
              context.strokeRect(snake[i].x, snake[i].y, box/2, box/2);
          }
          context.fillStyle = 'red';
          context.fillRect(food.x, food.y, box, box);
          let snakeX = snake[0].x;
          let snakeY = snake[0].y;
          if (d == 'LEFT') snakeX -= box;
          if (d == 'UP') snakeY -= box;
          if (d == 'RIGHT') snakeX += box;
          if (d == 'DOWN') snakeY += box;
          if (snakeX == food.x && snakeY == food.y) {
              food = {
                  x: Math.floor(Math.random() * 20) * box,
                  y: Math.floor(Math.random() * 20) * box
              };
          } else {
              snake.pop();
          }
          let newHead = {
              x: snakeX,
              y: snakeY
          };
          snake.unshift(newHead);
      }

      let game = setInterval(draw, 100);
    </script>
  </body>
</html>
