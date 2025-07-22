const request = require("supertest");
const { Rental } = require("../../../models/rental");
const { User } = require("../../../models/user");
const mongoose = require("mongoose");

describe("/api/returns", () => {
  let server;
  let customerId;
  let movieId;
  let rental;

  beforeEach(async () => {
    server = require("../../../index");

    customerId = new mongoose.Types.ObjectId();
    movieId = new mongoose.Types.ObjectId();

    rental = new Rental({
      customer: {
        _id: customerId,
        name: "JohnDoe",
        phone: "123456",
      },
      movie: {
        _id: movieId,
        title: "movie title",
        dailyRentalRate: 2,
      },
    });

    await rental.save();
  });
  afterEach(async () => {
    await server.close();
    await Rental.deleteMany({});
  });

  //   Ensure rental saves to the DB correctly
  //   it("should work!", async () => {
  //     const result = await Rental.findById(rental._id);
  //     expect(result).not.toBeNull();
  //   });

  it("should return 401 if client is not logged in!", async () => {
    const res = await request(server)
      .post("/api/returns")
      .send({ customerId: customerId, movieId: movieId });

    expect(res.status).toBe(401);
  });

  it("should return 400 if customerId is not provided", async () => {
    const token = new User().generateAuthToken();

    const res = await request(server)
      .post("/api/returns")
      .set("x-auth-token", token)
      .send({ movieId: movieId });

    expect(res.status).toBe(400);
  });

  it("should return 400 if movieId is not provided", async () => {
    const token = new User().generateAuthToken();

    const res = await request(server)
      .post("/api/returns")
      .set("x-auth-token", token)
      .send({ customerId: customerId });

    expect(res.status).toBe(400);
  });
});
