const lib = require("../lib");

describe("absolute", () => {
  test("should return a positive if number is positive", () => {
    const result = lib.absolute(1);
    expect(result).toBe(1);
  });

  test("should return a positive if number is negative", () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1);
  });

  test("should return 0 if number is 0", () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
  });
});

describe("greet", () => {
  it("should return the greeting message", () => {
    const result = lib.greet("Mosh");
    expect(result).toMatch(/Mosh/);
    // expect(result.toContain("Mosh")); // Alternative
  });
});
