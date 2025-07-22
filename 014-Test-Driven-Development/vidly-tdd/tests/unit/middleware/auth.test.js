const { User } = require("../../../models/user");
const auth = require("../../../middleware/auth");
require("dotenv").config({ path: `.env.${process.env.NODE_ENV || "test"}` });

describe("auth middleware", () => {
  it("should populate req.user with the payload of valid JWT", () => {
    const token = new User().generateAuthToken();

    // mock function
    const req = {
      header: jest.fn().mockReturnValue(token),
    };
    const res = {};
    const next = jest.fn();
    auth(req, res, next);
    expect(req.user).toBeDefined();
  });
});
