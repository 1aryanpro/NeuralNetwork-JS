class Matrix {
  constructor(w, h, f = () => 0) {
    let data = [];
    for (let i = 0; i < h; i++) {
      data[i] = [];
      for (let j = 0; j < w; j++) {
        data[i][j] = f();
      }
    }

    this.data = data;
    this.w = w;
    this.h = h;
  }

  static map(a, f) {
    let result = matrix(a.length, a[0].length);
    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < a[0].length; j++) {
        result[i][j] = f(a[i][j], i, j);
      }
    }

    return result;
  }

  static map2(a, b, f) {
    if (a[0].length != b[0].length || a.length != b.length) return null;
    let result = matrix(a.length, a[0].length);
    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < a[0].length; j++) {
        result[i][j] = f(a[i][j], b[i][j], i, j);
      }
    }

    return result;
  }

  static add(a, b) {
    return Matrix.map2(a, b, (x, y) => x + y);
  }

  static sub(a, b) {
    return Matrix.map2(a, b, (x, y) => x - y);
  }

  static dot(a, b) {
    if (a[0].length != b.length) return null;
    let res = matrix(a.length, b[0].length);
    for (let row = 0; row < res.length; row++) {
      for (let col = 0; col < res[0].length; col++) {
        for (let i = 0; i < a[0].length; i++) {
          res[row][col] += a[row][i] * b[i][col];
        }
      }
    }
    return res;
  }

  static T(a) {
    let res = matrix(a[0].length, a.length);
    for (let row = 0; row < res.length; row++) {
      for (let col = 0; col < res[0].length; col++) {
        res[row][col] = a[col][row];
      }
    }
    return res;
  }

  print() {
    console.table(this.data);
  }
}

function matrix(h, w, f = () => 0) {
  let data = [];
  for (let i = 0; i < h; i++) {
    data[i] = [];
    for (let j = 0; j < w; j++) {
      data[i][j] = f();
    }
  }
  return data;
}
