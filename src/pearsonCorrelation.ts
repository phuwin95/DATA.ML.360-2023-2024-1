import { mean } from "./utils";

/**
 * get the pearson correlation between two arrays
 * @param x array of numbers
 * @param y array of number
 * @returns the pearson correlation between x and y
 */
const pearsonCorrelation = (x: number[], y: number[]) => {
  const n = x.length;
  const meanX = mean(x);
  const meanY = mean(y);
  let numerator = 0;
  let denominatorX = 0;
  let denominatorY = 0;
  for (let i = 0; i < n; i++) {
    numerator += (x[i] - meanX) * (y[i] - meanY);
    denominatorX += (x[i] - meanX) ** 2;
    denominatorY += (y[i] - meanY) ** 2;
  }
  return numerator / (Math.sqrt(denominatorX) * Math.sqrt(denominatorY));
};

export default pearsonCorrelation;
