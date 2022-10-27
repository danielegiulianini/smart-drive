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
        "/api/v1/vehicles/vehiclesModels/models?year=2020&make=Tesla"
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
        "/api/v1/vehicles/vehiclesModels/series?year=2020&make=Tesla&model=Model 3 Long Range"
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
        "/api/v1/vehicles/vehiclesModels/vehicleDetails/42274"
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

