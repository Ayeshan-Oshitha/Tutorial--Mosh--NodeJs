const lib = require("../lib");
const db = require("../db");
const mail = require("../mail");

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

describe("getCurrencies", () => {
  it("should return supported currencies", () => {
    const result = lib.getCurrencies();
    expect(result).toEqual(expect.arrayContaining(["EUR", "USD", "AUD"]));
  });
});

describe("getProduct", () => {
  it("Should return the product with the given id", () => {
    const result = lib.getProduct(1);
    expect(result).toMatchObject({ id: 1, price: 10 });
  });
});

describe("registerUser", () => {
  it("should throw if username is falsy", () => {
    // falsy values - Null, undefined, NaN, '', 0, false
    const args = [null, undefined, NaN, "", 0, false];
    args.forEach((a) => {
      expect(() => {
        lib.registerUser(a);
      }).toThrow();
    });
  });

  it("should return a user object if valid username is passed", () => {
    const result = lib.registerUser("mosh");
    expect(result).toMatchObject({ username: "mosh" });
    expect(result.id).toBeGreaterThan(0);
  });
});

describe("applyDiscount", () => {
  it("should apply 10% discount is customer has more than 10 points", () => {
    // Mock function
    db.getCustomerSync = function (id) {
      console.log("Fake reading customer");
      return { id: id, points: 15 };
    };

    const order = { customerId: 1, totalPrice: 10 };
    lib.applyDiscount(order);
    expect(order.totalPrice).toBe(9);
  });
});

describe("notifyCustomer", () => {
  it("should send an email to the customer", () => {
    // Mock Function
    db.getCustomerSync = function (customerId) {
      return { email: "a" };
    };

    // Mock Function
    let mailsent = false;
    mail.send = function (email, message) {
      mailsent = true;
    };

    lib.notifyCustomer({ customerId: 1 });
    expect(mailsent).toBe(true);
  });
});
