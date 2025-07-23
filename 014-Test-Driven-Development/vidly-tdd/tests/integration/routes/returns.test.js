const request = require("supertest");
const { Movie } = require("../../../models/movie");
const { Rental } = require("../../../models/rental");
const { User } = require("../../../models/user");
const mongoose = require("mongoose");
const moment = require("moment");

describe("/api/returns", () => {
  let server;
  let customerId;
  let movieId;
  let rental;
  let movie;

  let token;

  // happy path
  const exec = () => {
    return request(server)
      .post("/api/returns")
      .set("x-auth-token", token)
      .send({ customerId: customerId, movieId: movieId });
  };

  beforeEach(async () => {
    server = require("../../../index");

    customerId = new mongoose.Types.ObjectId();
    movieId = new mongoose.Types.ObjectId();
    token = new User().generateAuthToken();

    movie = new Movie({
      _id: movieId,
      title: "movie title",
      dailyRentalRate: 2,
      genre: { name: "Rock" },
      numberInStock: 10,
    });

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

    await movie.save();
    await rental.save();
  });
  afterEach(async () => {
    await server.close();
    await Rental.deleteMany({});
    await Movie.deleteMany({});
  });

  //   Ensure rental saves to the DB correctly
  //   it("should work!", async () => {
  //     const result = await Rental.findById(rental._id);
  //     expect(result).not.toBeNull();
  //   });

  it("should return 401 if client is not logged in!", async () => {
    token = "";
    const res = await exec();

    expect(res.status).toBe(401);
  });

  it("should return 400 if customerId is not provided", async () => {
    customerId = "";
    const res = await exec();

    expect(res.status).toBe(400);
  });

  it("should return 400 if movieId is not provided", async () => {
    movieId = "";
    const res = await exec();

    expect(res.status).toBe(400);
  });

  it("should return 404 if no rental found for the customerID & movieId", async () => {
    await Rental.deleteMany({}); // delete rental to simulate no document in the database

    const res = await exec();

    expect(res.status).toBe(404);
  });

  it("should return 400 if no rental return is already processed", async () => {
    rental.dateReturned = new Date();

    await rental.save();

    const res = await exec();

    expect(res.status).toBe(400);
  });

  it("should return 200 if we have a valid request", async () => {
    const res = await exec();

    expect(res.status).toBe(200);
  });

  it("should set the returnDate if input is valid", async () => {
    const res = await exec();

    const rentalInDb = await Rental.findById(rental._id);
    const diff = new Date() - rentalInDb.dateReturned;
    expect(diff).toBeLessThan(10 * 1000);
  });

  it("should set the rentalFee if input is valid", async () => {
    rental.dateOut = moment().add(-7, "days").toDate();
    await rental.save();

    const res = await exec();

    const rentalInDb = await Rental.findById(rental._id);
    expect(rentalInDb.rentalFee).toBe(14);
  });

  it("should increase the movie stock", async () => {
    const res = await exec();

    const movieInDb = await Movie.findById(movieId);
    expect(movieInDb.numberInStock).toBe(movie.numberInStock + 1);
  });

  it("should return rental if input is valid", async () => {
    const res = await exec();

    const rentalInDb = await Rental.findById(rental._id);
    expect(res.body).toHaveProperty("dateOut");
    expect(res.body).toHaveProperty("dateReturned");
    expect(res.body).toHaveProperty("rentalFee");
    expect(res.body).toHaveProperty("customer");
    expect(res.body).toHaveProperty("movie");

    // Alternative Way
    // expect(Object.keys(res.body)).toEqual(
    //   expect.arrayContaining(['dateOut', 'dateReturned', 'rentalFee', 'customer', 'movie'])
    // )
  });
});
