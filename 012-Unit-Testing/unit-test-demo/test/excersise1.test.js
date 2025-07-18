const excersise = require("../excersise1");

describe("fizzbuzz", () => {
  it("should throw if input not a number", () => {
    const args = ["a", true, null, undefined, {}, []];
    // Can write seperate expects to each arg without using a loop
    args.forEach((a) => {
      expect(() => {
        excersise.fizzBuzz(a);
      }).toThrow();
    });
  });

  it("should return FizzBuzz if divide by 3 and 5", () => {
    const result = excersise.fizzBuzz(15);
    expect(result).toEqual("FizzBuzz");
  });

  it("should return Fizz if divide only by 3", () => {
    const result = excersise.fizzBuzz(9);
    expect(result).toEqual("Fizz");
  });

  it("should return Buzz if divide only by 5", () => {
    const result = excersise.fizzBuzz(10);
    expect(result).toEqual("Buzz");
  });

  it("should return input if not divide by 3 or 5", () => {
    const result = excersise.fizzBuzz(1);
    expect(result).toEqual(1);
  });
});
