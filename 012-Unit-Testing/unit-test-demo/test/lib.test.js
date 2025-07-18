const lib = require("../lib");

test("absolute - should return a positive if number is positive", () => {
  const result = lib.absolute(1);
  expect(result).toBe(1);
});

test("absolute - should return a positive if number is negative", () => {
  const result = lib.absolute(-1);
  expect(result).toBe(1);
});

test("absolute - should return 0 if number is 0", () => {
  const result = lib.absolute(0);
  expect(result).toBe(0);
});
