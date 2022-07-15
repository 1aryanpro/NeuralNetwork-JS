class NN {
  constructor(inputs, hiddens, outputs) {
    const random = () => Math.random() * 2 - 1;

    this.weights_ih = matrix(hiddens, inputs, random);
    this.weights_ho = matrix(outputs, hiddens, random);

    this.biases_ih = matrix(hiddens, 1, random);
    this.biases_ho = matrix(outputs, 1, random);

    this.ALPHA = 0.01;
  }

  layerOutput(inputs, weights, biases) {
    const transfer = (x) => 1 / (1 + Math.exp(-x));
    let outputs = Matrix.dot(weights, inputs);
    outputs = Matrix.add(outputs, biases);
    outputs = Matrix.map(outputs, transfer);
    return outputs;
  }

  feedForward(inputs) {
    inputs = Matrix.T([inputs]);

    let hiddens = this.layerOutput(inputs, this.weights_ih, this.biases_ih);
    let outputs = this.layerOutput(hiddens, this.weights_ho, this.biases_ho);

    return outputs;
  }

  layerDeltas(inputs, outputs, errors) {
    const transfer_deriv = (v) => v * (1 - v);

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

    let hiddens = this.layerOutput(inputs, this.weights_ih, this.biases_ih);
    let outputs = this.layerOutput(hiddens, this.weights_ho, this.biases_ho);

    let output_errors = Matrix.sub(targets, outputs);
    let [weights_ho_deltas, biases_ho_deltas] = this.layerDeltas(
      hiddens,
      outputs,
      output_errors
    );
    this.weights_ho = Matrix.add(this.weights_ho, weights_ho_deltas);
    this.biases_ho = Matrix.add(this.biases_ho, biases_ho_deltas);

    let weights_ho_T = Matrix.T(this.weights_ho);
    let hidden_errors = Matrix.dot(weights_ho_T, output_errors);
    let [weights_ih_deltas, biases_ih_deltas] = this.layerDeltas(
      inputs,
      hiddens,
      hidden_errors
    );
    this.weights_ih = Matrix.add(this.weights_ih, weights_ih_deltas);
    this.biases_ih = Matrix.add(this.biases_ih, biases_ih_deltas);
  }
}

