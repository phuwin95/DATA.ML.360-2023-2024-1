// utilize the mean of absolute differences
export const calculateDisagreement = (x: number, numbers: number[]) => {
  let sum = 0;
  numbers.forEach((predictionSet) => {
    sum += Math.abs(x - predictionSet);
  });
  return sum / numbers.length;
};
