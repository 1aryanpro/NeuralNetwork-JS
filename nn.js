class Layer {
  constructor(size, psize) {
    this.weights = matrix(psize, size, () => Math.random() * 2 - 1);
    this.biases = matrix(1, size, () => Math.random() * 2 - 1);
  }

  feedForward(inputs) {
    let res = Matrix.mult(this.weights, inputs);
    res = Matrix.add(res, this.biases);
    return Matrix.map(res, this.transfer);
  }

  transfer(x) {
    return 1 / (1 + Math.exp(-x));
  }
}

class NN {
  constructor(layers) {
    this.layers = [];
    for (let i = 1; i < layers.length; i++) {
      this.layers.push(new Layer(layers[i], layers[i - 1]));
    }
  }

  forwardPropogate(inputs) {
    let outputs = inputs;
    for (let i = 0; i < this.layers.length; i++) {
      outputs = this.layers[i].feedForward(outputs);
    }
    return outputs;
  }
}

let nn = new NN([2, 3, 1]);
console.table(nn.forwardPropogate([[1], [1]]));
