let data, table;
function preload() {
  table = loadTable('./train250.csv', 'csv', 'header');
}

function setup() {
  data = table.getArray();
  createCanvas(500, 500, WEBGL);
}

function draw() {
  background(51);
}
