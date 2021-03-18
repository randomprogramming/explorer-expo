const BASE_SIZE = 4;

export default pxGenerator = function (multiplier) {
  if (typeof multiplier !== "number") return 0;

  return multiplier * BASE_SIZE;
};
