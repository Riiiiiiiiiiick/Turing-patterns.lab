var grid;
var next;

let scala = 4;
let cols, rows;

var dA = 1;
var dB = 0.5;
var feed = 0.05;
var k = 0.06;

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30);
  pixelDensity(1);
  noSmooth();

  cols = floor(width / scala);
  rows = floor(height / scala);

  grid = [];
  next = [];
  for (var x = 0; x < cols; x++) {
    grid[x] = [];
    next[x] = [];
    for (var y = 0; y < rows; y++) {
      grid[x][y] = { a: 1, b: 0 };
      next[x][y] = { a: 1, b: 0 };
    }
  }
}

function draw() {
  background(10);

  if (mouseIsPressed) {
    let steps = 20;
    for (let i = 0; i <= steps; i++) {
      let lerpX = lerp(pmouseX, mouseX, i / steps);
      let lerpY = lerp(pmouseY, mouseY, i / steps);

      let mx = floor(lerpX / scala);
      let my = floor(lerpY / scala);
      let r = 5;

      for (let dx = -r; dx <= r; dx++) {
        for (let dy = -r; dy <= r; dy++) {
          if (dx * dx + dy * dy <= r * r) {
            let x = mx + dx;
            let y = my + dy;
            let tx = (x + cols) % cols;
            let ty = (y + rows) % rows;
            grid[tx][ty].b = 1;
          }
        }
      }
    }
  }

  for (let n = 0; n < 4; n++) {
    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        let a = grid[x][y].a;
        let b = grid[x][y].b;
        next[x][y].a = a + dA * laplaceA(x, y) - a * b * b + feed * (1 - a);
        next[x][y].b = b + dB * laplaceB(x, y) + a * b * b - (k + feed) * b;

        next[x][y].a = constrain(next[x][y].a, 0, 1);
        next[x][y].b = constrain(next[x][y].b, 0, 1);
      }
    }
    swap();
  }

  loadPixels();
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      let a = grid[x][y].a;
      let b = grid[x][y].b;
      let diff = a - b;
      let useBright = diff > 0.1;

      let rCol = useBright ? 10 : 192;
      let gCol = useBright ? 10 : 192;
      let bCol = useBright ? 10 : 192;

      for (let dx = 0; dx < scala; dx++) {
        for (let dy = 0; dy < scala; dy++) {
          let px = x * scala + dx;
          let py = y * scala + dy;
          let i = 4 * (px + py * width);
          if (i >= 0 && i + 3 < pixels.length) {
            pixels[i] = rCol;
            pixels[i + 1] = gCol;
            pixels[i + 2] = bCol;
            pixels[i + 3] = 255;
          }
        }
      }
    }
  }
  updatePixels();
}

function laplaceA(x, y) {
  let sumA = 0;
  sumA += grid[x][y].a * -1;

  sumA += grid[(x - 1 + cols) % cols][y].a * 0.2;
  sumA += grid[(x + 1) % cols][y].a * 0.2;
  sumA += grid[x][(y - 1 + rows) % rows].a * 0.2;
  sumA += grid[x][(y + 1) % rows].a * 0.2;

  sumA += grid[(x - 1 + cols) % cols][(y - 1 + rows) % rows].a * 0.05;
  sumA += grid[(x + 1) % cols][(y - 1 + rows) % rows].a * 0.05;
  sumA += grid[(x + 1) % cols][(y + 1) % rows].a * 0.05;
  sumA += grid[(x - 1 + cols) % cols][(y + 1) % rows].a * 0.05;

  return sumA;
}

function laplaceB(x, y) {
  let sumB = 0;
  sumB += grid[x][y].b * -1;

  sumB += grid[(x - 1 + cols) % cols][y].b * 0.2;
  sumB += grid[(x + 1) % cols][y].b * 0.2;
  sumB += grid[x][(y - 1 + rows) % rows].b * 0.2;
  sumB += grid[x][(y + 1) % rows].b * 0.2;

  sumB += grid[(x - 1 + cols) % cols][(y - 1 + rows) % rows].b * 0.05;
  sumB += grid[(x + 1) % cols][(y - 1 + rows) % rows].b * 0.05;
  sumB += grid[(x + 1) % cols][(y + 1) % rows].b * 0.05;
  sumB += grid[(x - 1 + cols) % cols][(y + 1) % rows].b * 0.05;

  return sumB;
}

function swap() {
  let temp = grid;
  grid = next;
  next = temp;
}

function keyPressed() {
    if (key === 's') {
    saveCanvas('rdrt.jpg');
    }
}
