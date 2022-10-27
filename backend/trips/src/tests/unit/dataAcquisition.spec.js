//tests utils
const {
  validateNotEmpty,
  validateStringEquality,
  validateMongoDuplicationError,
} = require("../../utils/validators.utils");

const {
  dbConnect,
  dbDisconnect,
  dropCollections,
} = require("../../utils/dbHandler.utils");

//to-test data
const Trip = require("../../models/trips");
const TripsService = require("../../services/trips.dataAcquisition");

beforeAll(async () => dbConnect());
afterAll(async () => dbDisconnect());
afterEach(async () => {
  await dropCollections();
});

//fixtures
const fakeVin = "JH4DA3450HS011682";

const fakeTripData = {
  sensorId: "fakeSensorId",
  vehicleIdentificationNumber: fakeVin,
  //startTimestamp
  //endTimestamp
  userId: "fakeUserId",
};

describe("a trip", () => {
  describe("when added", () => {
    //service methods
    it("should be persisted correctly", async () => {
      //aggiungo un trip e me lo ritrovo con i dati che ho inserito
      savedTrip = await TripsService.addTrip(fakeTripData);

      validateNotEmpty(savedTrip);

      validateStringEquality(savedTrip.sensorId, fakeTripData.sensorId);
      validateStringEquality(
        savedTrip.vehicleIdentificationNumber,
        fakeTripData.vehicleIdentificationNumber
      );
      validateNotEmpty(savedTrip.startTimestamp);
      validateStringEquality(savedTrip.userId, fakeTripData.userId);
    });
  });

  describe("when closed", () => {
    //service methods
    it("should set the end timestamp accordingly", async () => {
      let savedTrip = await TripsService.addTrip(fakeTripData);
      await TripsService.close(savedTrip._id);
      let fetchedTrip = await TripsService.get(savedTrip._id);

      validateNotEmpty(fetchedTrip.endTimestamp);
    });

    it("should trigger an error if never added", async () => {
      expect(async () => {
        await TripsService.close("41224d776a326fb40f000001"); //a valid ObjectId id (for not throwing CastError)
        savedTrip = await TripsService.addTrip(fakeTripData);
      }).rejects.toThrow(Error);
    });

    it("should trigger an error if already closed", async () => {
      const savedTrip = await TripsService.addTrip(fakeTripData);
      await TripsService.close(savedTrip._id);
      expect(async () => {
        await TripsService.close(savedTrip._id);
      }).rejects.toThrow(Error);
    });
  });

  //other tests for trips:
  //- retrieving (list) trips
  //- filtering trips by userId, by date
  //- sorting trips by ecoScore, other properties...
});

/*
  measurements: [
    //to put in other collection keeping the measurement id only here?
    {
      //>actually used:
      timestamp: { type: Date },
      rpm: { type: Number },
      kph: { type: Number },
      odometer: { type: Number },

      //>these for future extensions:
      position: {
        longitude: { type: Number },
        latitude: { type: Number },
      },
      engineLoad: { type: Number },
      acceleration: {
        x: { type: Number },
        y: { type: Number },
        z: { type: Number },
      },
      fuelRate: {
        type: Number,
      },
    },
  ],
*/

//measurements' fixtures
const fakeRpm = "1920";
const fakeKph = "89";
const fakeOdometer = "12";

const fakeMeasurementData = {
  rpm: fakeRpm,
  kph: fakeKph,
  odometer: fakeOdometer,
};

describe("a measurement", () => {
  //aggiungo un measurement e me lo ritrovo con i dati che ho inserito
  describe("when added", () => {
    it("should get its timestamp set accordingly", async () => {
      let savedTrip = await TripsService.addTrip(fakeTripData);

      await TripsService.addMeasurement(fakeVin, fakeMeasurementData); //add measurement should attach measurements to the (unique) trip with that fakeVin

      const fetchedTrip = await TripsService.get(savedTrip._id);

      validateNotEmpty(fetchedTrip.measurements[0].timestamp);
    });

    it("should get its values persisted correctly", async () => {
      let savedTrip = await TripsService.addTrip(fakeTripData);

      await TripsService.addMeasurement(fakeVin, fakeMeasurementData); //add measurement should attach measurements to the (unique) trip with that fakeVin

      const fetchedTrip = await TripsService.get(savedTrip._id);

      //FROM: https://medium.com/@andrei.pfeiffer/jest-matching-objects-in-array-50fe2f4d6b98
      expect(fetchedTrip.measurements).toEqual(
        // 1
        expect.arrayContaining([
          // 2
          expect.objectContaining({
            // 3
            rpm: parseInt(fakeRpm), // 4
            kph: parseInt(fakeKph),
            odometer: parseInt(fakeOdometer),
          }),
        ])

        /*
       you expect that:
1.  your Array equals
2. an Array that contains
3. an Object that contains
4. the following properties
*/
      );
    });
  });
});
