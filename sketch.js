// let data, table;
// function preload() {
//   table = loadTable('./train250.csv', 'csv', 'header');
// }

let nn = new NN([2, 3, 3, 1]);
let size = 10;
let w, h;
let check = false;

function setup() {
  createCanvas(800, 800);
  noStroke();
  w = width / size;
  h = height / size;

  // data = table.getArray();
}

function draw() {
  background(51);

  const func = (x, y) => (x * x + y * y < 1 ? 1 : 0);
  // const func = (x, y) => Math.abs(x - y) < 0.1 ? 1 : 0;
  // const func = (x, y) => y < x ? 1 : 0;

  for (let i = 0; i < 10000; i++) {
    let x = random();
    let y = random();

    nn.train([x, y], [func(x, y)]);
  }

  for (let i = 0; i < w; i++) {
    for (let j = 0; j < h; j++) {
      let output = nn.feedForward([i / w, j / h]);
      let c;
      if (check)
        c = lerpColor(color('#FF6961'), color('#BEE5B0'), func(i / w, j / h));
      else c = lerpColor(color('#FF6961'), color('#BEE5B0'), output);
      fill(c);
      circle(i * size + size / 2, height - (j * size + size / 2), size);
    }
  }
}

function keyPressed() {
  if (keyCode != 32) return;
  check = !check;
}
