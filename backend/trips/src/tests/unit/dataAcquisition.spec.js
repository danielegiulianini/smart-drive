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
const trips = require("../../models/trips");

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

    /*it("should trigger an error if added twice", async () => {
      expect.assertions(2);
      expect(async () => {
        savedTrip = await TripsService.addTrip(fakeTripData);
        savedTrip = await TripsService.addTrip(fakeTripData);
      })
        .rejects //needed for testing async code
        .toThrow(Error);
    });*/
  });

  describe("when closed", () => {
    //service methods
    it("should set the end timestamp accordingly", async () => {
      let savedTrip = await TripsService.addTrip(fakeTripData);
      await TripsService.close(savedTrip._id);
      let savedTrip2 = await TripsService.get(savedTrip._id);
      validateNotEmpty(savedTrip2.endTimestamp);
    });

    it("should trigger an error if never added", async () => {
      expect(async () => {
        await TripsService.close("41224d776a326fb40f000001"); //a valid ObjectId id (for not throwing CastError)
        savedTrip = await TripsService.addTrip(fakeTripData);
      }).rejects.toThrow(Error);
    });

    it("should trigger an error if already closed", async () => {
      expect(async () => {
        const savedTrip = await TripsService.addTrip(fakeTripData);
        await TripsService.close(savedTrip._id);
        await TripsService.close(savedTrip._id);
      }).rejects.toThrow(Error);
    });
  });
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

//fixtures
const fakeRpm = "1920";
const fakeKph = "89";
const fakeOdometer = "12";

const fakeMeasurementData = {
  rpm: fakeRpm,
  kph: fakeKph,
  odometer: fakeOdometer,
};

describe("a measurement", () => {
  //aggiungo un measurement e me lo ritrovo  con i dati che ho inserito
  describe("when added", () => {
    it("should get its timestamp set accordingly", async () => {
      let savedTrip = await TripsService.addTrip(fakeTripData);

      await TripsService.addMeasurement(fakeVin, fakeMeasurementData); //add measurement should attach measurements to the (unique) trip with that fakeVin

      const fetchedTrip = await TripsService.get(savedTrip._id);

      /*
      FROM: https://medium.com/@andrei.pfeiffer/jest-matching-objects-in-array-50fe2f4d6b98 
      const state = [
  { type: 'START', data: 'foo' },
  { type: 'START', data: 'baz' },
  { type: 'END', data: 'foo' },
]*/
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
      );

      /*
       you expect that:
1.  your Array equals
2. an Array that contains
3. an Object that contains
4. the following properties

*/
      /*DA RIVEDERE: expect(savedTrip.measurements).toContain(fakeMeasurementData);
      validateNotEmpty(savedMeasurement.timestamp);*/
    });

    it("should get its values persisted correctly", async () => {});
  });
});

/*
let mongo = null;
const connectDB = async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};*/

/*
const User = require('../user.model');
const { fakeUserData } = require('../../fixtures');
const {
  validateNotEmpty,
  validateStringEquality,
  validateMongoDuplicationError,
} = require('../../../utils/test-utils/validators.utils');
const {
  dbConnect,
  dbDisconnect,
} = require('../../../utils/test-utils/dbHandler.utils');

beforeAll(async () => dbConnect());
afterAll(async () => dbDisconnect());

describe('User Model Test Suite', () => {
  test('should validate saving a new student user successfully', async () => {
    const validStudentUser = new User({
      local: fakeUserData,
      role: fakeUserData.role,
    });
    const savedStudentUser = await validStudentUser.save();

    validateNotEmpty(savedStudentUser);

    validateStringEquality(savedStudentUser.role, fakeUserData.role);
    validateStringEquality(savedStudentUser.local.email, fakeUserData.email);
    validateStringEquality(
      savedStudentUser.local.username,
      fakeUserData.username
    );
    validateStringEquality(
      savedStudentUser.local.password,
      fakeUserData.password
    );
    validateStringEquality(
      savedStudentUser.local.firstName,
      fakeUserData.firstName
    );
    validateStringEquality(
      savedStudentUser.local.lastName,
      fakeUserData.lastName
    );
  });

  test('should validate MongoError duplicate error with code 11000', async () => {
    expect.assertions(4);
    const validStudentUser = new User({
      local: fakeUserData,
      role: fakeUserData.role,
    });

    try {
      await validStudentUser.save();
    } catch (error) {
      const { name, code } = error;
      validateMongoDuplicationError(name, code);
    }
  });
});
*/
