class NN {
  constructor(layers) {
    const random = () => Math.random();

    this.weights = [];
    this.biases = [];

    for (let i = 1; i < layers.length; i++) {
      let l = layers[i];
      let p = layers[i - 1];

      this.weights.push(matrix(l, p, random));
      this.biases.push(matrix(l, 1, random));
    }

    this.layers = layers.length - 1;

    this.ALPHA = 0.01;
  }

  layerOutput(inputs, weights, biases) {
    const transfer = (x) => Math.max(x, 0);

    let outputs = Matrix.dot(weights, inputs);
    outputs = Matrix.add(outputs, biases);
    outputs = Matrix.map(outputs, transfer);
    return outputs;
  }

  feedForward(inputs) {
    let outputs = Matrix.T([inputs]);

    for (let i = 0; i < this.layers; i++) {
      outputs = this.layerOutput(outputs, this.weights[i], this.biases[i]);
    }

    return outputs;
  }

  layerDeltas(inputs, outputs, errors) {
    const transfer_deriv = (v) => v;

    let gradient = Matrix.map(outputs, transfer_deriv);
    gradient = Matrix.map2(gradient, errors, (a, b) => a * b);
    gradient = Matrix.map(gradient, (v) => v * this.ALPHA);

    let inputs_T = Matrix.T(inputs);
    let weights_deltas = Matrix.dot(gradient, inputs_T);
    return [weights_deltas, gradient];
  }

  train(inputs, targets) {
    inputs = Matrix.T([inputs]);
    targets = Matrix.T([targets]);

    let outputs = [inputs];

    for (let i = 0; i < this.layers; i++) {
      outputs.push(
        this.layerOutput(
          outputs[outputs.length - 1],
          this.weights[i],
          this.biases[i]
        )
      );
    }
    let errors = Matrix.sub(targets, outputs[this.layers]);

    for (let i = this.layers - 1; i >= 0; i--) {
      let [weight_deltas, bias_deltas] = this.layerDeltas(
        outputs[i],
        outputs[i + 1],
        errors
      );
      this.weights[i] = Matrix.add(this.weights[i], weight_deltas);
      this.biases[i] = Matrix.add(this.biases[i], bias_deltas);

      let wT = Matrix.T(this.weights[i]);
      errors = Matrix.dot(wT, errors);
    }
  }
}
