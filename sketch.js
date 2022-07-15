// let data, table;
// function preload() {
//   table = loadTable('./train250.csv', 'csv', 'header');
// }

let nn = new NN(2, 6, 1);
let size = 10;
let w, h;
let check = false;

function setup() {
  createCanvas(800, 800);
  noStroke();
  w = width / size;
  h = height / size;

  // data = table.getArray();
  frameRate(10);
}

function draw() {
  background(51);

  const func = (v) => pow(v - w / 2, 2) / 6;
  for (let i = 0; i < 5000; i++) {
    let x = random(w);
    let y = random(h);

    nn.train([x/w, y/h], [y > func(x) ? 1 : 0]);
  }

  for (let i = 0; i < w; i++) {
    for (let j = 0; j < h; j++) {
      let output = nn.feedForward([i/w, j/h]);
      let c;
      if (check)c = lerpColor(color('#FF6961'), color('#BEE5B0'), func(i) < j);
      else c = lerpColor(color('#FF6961'), color('#BEE5B0'), output);
      fill(c);
      circle(i * size + size / 2, height - (j * size + size / 2), size);
    }
  }
}
