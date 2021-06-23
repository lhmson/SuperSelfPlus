class LinearRegressionClassifier {
  constructor(xdata, YData) {
    if (this.Xdata === undefined) {
      this.Xdata = null;
    }
    if (this.YData === undefined) {
      this.YData = null;
    }
    if (this.result1 === undefined) {
      this.result1 = null;
    }
    if (this.result2 === undefined) {
      this.result2 = null;
    }
    this.Xdata = xdata;
    this.YData = YData;
  }

  predictValue(inputValue) {
    const X1 = this.Xdata[0];
    const Y1 = this.YData[0];
    const Xmean = this.getXMean(this.Xdata);
    const Ymean = this.getYMean(this.YData);
    const lineSlope = this.getLineSlope(Xmean, Ymean, X1, Y1);
    const YIntercept = this.getYIntercept(Xmean, Ymean, lineSlope);
    const prediction = lineSlope * inputValue + YIntercept;
    return prediction;
  }

  getLineSlope(Xmean, Ymean, X1, Y1) {
    const num1 = X1 - Xmean;
    const num2 = Y1 - Ymean;
    const denom = (X1 - Xmean) * (X1 - Xmean);
    return (num1 * num2) / denom;
  }

  getYIntercept(Xmean, Ymean, lineSlope) {
    return Ymean - lineSlope * Xmean;
  }

  getXMean(Xdata) {
    this.result1 = 0.0;
    for (let i = 0; i < Xdata.length; i++) {
      {
        this.result1 = this.result1 + Xdata[i];
      }
    }
    return this.result1;
  }

  getYMean(Ydata) {
    this.result2 = 0.0;
    for (let i = 0; i < Ydata.length; i++) {
      {
        this.result2 = this.result2 + Ydata[i];
      }
    }
    return this.result2;
  }
}
