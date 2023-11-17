/**
 * calculate the mean value of the absolute difference between x and each number in the array
 * @param x the number to compare
 * @param numbers the array of numbers to compare against
 * @returns the mean of the absolute difference between x and each number in the array
 */
export const meanAbsoluteDifference = (x: number, numbers: number[]) => {
  let sum = 0;
  numbers.forEach((predictionSet) => {
    sum += Math.abs(x - predictionSet);
  });
  return sum / numbers.length;
};
