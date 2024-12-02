export const sumArray = (array) => {
  if (!Array.isArray(array)) {
    throw new TypeError("Input must be an array.");
  }

  return array.reduce((sum, num) => {
    if (typeof num !== "number") {
      throw new TypeError("All elements in the array must be numbers.");
    }
    return sum + num;
  }, 0);
};
