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

  static map2(a, b, f) {
    if (a.w != b.w || a.h != b.h) return null;
    let result = new Matrix(a.w, a.h);
    for (let i = 0; i < a.h; i++) {
      for (let j = 0; j < a.w; j++) {
        result.data[i][j] = f(a.data[i][j],b.data[i][j]);
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
}

