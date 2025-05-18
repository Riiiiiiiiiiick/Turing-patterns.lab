/*

let A, B, Anext, Bnext;
let dA = 1.0;
let dB = 0.5;
let feed = 0.055;
let kill = 0.062;
let rows, cols;
let graphics;

function setup() {
    createCanvas(windowWidth, windowHeight);
    pixelDensity(1);
  
    cols = windowWidth;
    rows = windowHeight;
  
    A = Array(rows).fill().map(() => Array(cols).fill(1));
    B = Array(rows).fill().map(() => Array(cols).fill(0));
    Anext = Array(rows).fill().map(() => Array(cols).fill(1));
    Bnext = Array(rows).fill().map(() => Array(cols).fill(0));
  
    // Seed a square of B in the center
    for (let y = rows/2 - 10; y < rows/2 + 10; y++) {
      for (let x = cols/2 - 10; x < cols/2 + 10; x++) {
        B[y][x] = 1;
      }
    }
  
    graphics = createGraphics(cols, rows);
    graphics.pixelDensity(1);
  }

function draw() {
  for (let i = 0; i < 2; i++) {
    updateReaction();
  }

  graphics.loadPixels();
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let a = A[y][x];
      let b = B[y][x];
      let c = floor((a - b) * 255);
      c = constrain(c, 0, 255);
      let index = (x + y * cols) * 4;
      graphics.pixels[index + 0] = c; // Red
      graphics.pixels[index + 1] = c; // Green
      graphics.pixels[index + 2] = c; // Blue
      graphics.pixels[index + 3] = 255;
    }
  }
  graphics.updatePixels();
  image(graphics, 0, 0);
}

function updateReaction() {
  for (let y = 1; y < rows - 1; y++) {
    for (let x = 1; x < cols - 1; x++) {
      let a = A[y][x];
      let b = B[y][x];

      let lapA = laplace(x, y, A);
      let lapB = laplace(x, y, B);

      let reaction = a * b * b;
      Anext[y][x] = a + (dA * lapA - reaction + feed * (1 - a));
      Bnext[y][x] = b + (dB * lapB + reaction - (kill + feed) * b);

      Anext[y][x] = constrain(Anext[y][x], 0, 1);
      Bnext[y][x] = constrain(Bnext[y][x], 0, 1);
    }
  }

  [A, Anext] = [Anext, A];
  [B, Bnext] = [Bnext, B];
}

function laplace(x, y, grid) {
  let sum = 0;
  sum += grid[y][x] * -1;
  sum += grid[y - 1][x] * 0.2;
  sum += grid[y + 1][x] * 0.2;
  sum += grid[y][x - 1] * 0.2;
  sum += grid[y][x + 1] * 0.2;
  sum += grid[y - 1][x - 1] * 0.05;
  sum += grid[y - 1][x + 1] * 0.05;
  sum += grid[y + 1][x - 1] * 0.05;
  sum += grid[y + 1][x + 1] * 0.05;
  return sum;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(10, 10, 10);
}

*/