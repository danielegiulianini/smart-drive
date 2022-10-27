const request = require("supertest");
const express = require("express");

const routes = require("../../routes");

//simulated express app
const app = express();

app.use("/api/v1", routes); //same prefix as real APIs

//this is a specification of  how frontend must ask data to this microservice
//THIS SPECIICATION MUST BE RUN AFTER RUNNING ALL THE DEPENDENCIES OF VehiclesModels microservice (mongo-vehicle
//better would be as part of a github pipeline)
//I ask a vehicle for which I know... the response... and match against it
//to be completed... abandoned since it requires to ls 

describe("A Vehicle models service", () => {
  describe("when production years are requested", () => {
    it("should return them correctly", async () => {
      const response = await request(app).get(
        "api/v1/vehicles/vehiclesModels/productionYears/" //no query params
      );

      expect(response.status).toBe(200);
      console.log("la response:");
      console.log(response);
      //expect(arrayOfIds).arrayContaining([2010, 2020]); //or, for array: expect.arrayContaining(array), or for single item: expect.toContain(item);

      //expect(response.body.items.length).toBe(5);
    });
  });

  describe("when makes of a given year are requested", () => {
    it("should return them correctly", async () => {
      const response = await request(app).get(
        "/api/v1/vehicles/vehiclesModels/makes?year=2020"
      );

      expect(response.status).toBe(200);
      //expect(arrayOfIds).arrayContaining([2010, 2020]); //or, for array: expect.arrayContaining(array), or for single item: expect.toContain(item);
      console.log("la response:");
      console.log(response);
    });
  });

  describe("when models of a a make of a given year are requested", () => {
    it("should return them correctly", async () => {
      const response = await request(app).get(
        "/api/v1/vehicles/vehiclesModels/models/?year=2020&make=Tesla"
      );

      expect(response.status).toBe(200);
      //expect(arrayOfIds).arrayContaining([2010, 2020]); //or, for array: expect.arrayContaining(array), or for single item: expect.toContain(item);
      console.log("la response:");
      console.log(response);
    });
  });

  describe("when series of a model of a make of a given year are requested", () => {
    it("should return them correctly", async () => {
      const response = await request(app).get(
        "/api/v1/vehicles/vehiclesModels/series/?year=2012&make=Tesla&model=32557"
      );

      expect(response.status).toBe(200);
      //expect(arrayOfIds).arrayContaining([2010, 2020]); //or, for array: expect.arrayContaining(array), or for single item: expect.toContain(item);
      console.log("la response:");
      console.log(response);
    });
  });

  describe("when details of a vehicle", () => {
    it("should return them correctly", async () => {
      const response = await request(app).get(
        "/api/v1/vehicles/vehiclesModels/vehicleDetails/32557"
      );

      expect(response.status).toBe(200);

      console.log("la response:");
      console.log(response);

      /*expect(fetchedTrip.feedbacks).toEqual(
        // 1
        expect.arrayContaining([
          // 2
          expect.objectContaining(
            // 3
            { text: "Be smoother with the throttle." } // 4
          ),
        ])
      );*/
    });
  });
});

/*
//example:
describe("Book service integration tests", () => {
  test("Get first 5 results for 'Harry Potter' search", async () => {
    const response = await request(app).get(
      "/api/v1/books?query=Harry+Potter&limit=5"
    ); //use the request function that we can use the app// save the response to body variable

    expect(response.status).toBe(200);
    expect(response.body.items.length).toBe(5);
  });

  test("Get the book 'Harry Potter e la pietra filosofale", async () => {
    const response = await request(app).get("/api/v1/books/9CJWTbd-RYoC");

    expect(response.status).toBe(200);
    expect(response.body.id).toBe("9CJWTbd-RYoC");
  });

  test("Get a random Volume ID and expect to fail with 503", async () => {
    const response = await request(app).get("/api/v1/books/notfoundtest123");

    expect(response.status).toBe(503);
  });
});
*/
