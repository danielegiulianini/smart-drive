//tests utils
const {
  validateNotEmpty,
  validateStringEquality,
  validateMongoDuplicationError,
} = require("../../utils/validators.utils");
const { dbConnect, dbDisconnect } = require("../../utils/dbHandler.utils");

//to-test data
const Trip = require("../../models/trips");
const TripsService = require("../../services/trips.dataAcquisition");

beforeAll(async () => dbConnect());
afterAll(async () => dbDisconnect());

//fixtures
const fakedTripData = {
  sensorId: "fakeSensorId",
  vehicleIdentificationNumber: "fakeVehicleIdentificationNumber",
  //startTimestamp
  //endTimestamp
  userId: "fakeUserId",
};

describe("a trip", () =>
  describe("when added", () => {
    //service methods
    it("should be persisted correctly", async () => {
      //aggiungo un trip e me lo ritrovo con i dati che ho inserito
      savedTrip = TripsService.addTrip(fakedTripData);
      validateNotEmpty(savedTrip);

      validateStringEquality(savedTrip.sensorId, fakedTripData.sensorId);
      validateStringEquality(
        savedTrip.vehicleIdentificationNumber,
        fakedTripData.vehicleIdentificationNumber
      );
      validateNotEmpty(savedTrip.startTimestamp);
      validateStringEquality(savedTrip.userId, fakedTripData.userId);
    });

    it("should trigger an error if added twice", async () => {
      expect.assertions(4);
      expect(() => {
        savedTrip = TripsService.addTrip(fakedTripData);
        savedTrip = TripsService.addTrip(fakedTripData);
      }).toThrow(Error);
    });

    describe("when closed", () => {
      //service methods
      it("should set the end timestamp accordingly", async () => {
        let savedTrip = TripsService.add(fakedTripData);
        savedTrip = TripsService.close(savedTrip._id);
        validateNotEmpty(savedTrip.endTimestamp);
      });

      it("should trigger an error if never added", async () => {
        expect(() => {
          TripsService.close("tripIdNotExisting");
          savedTrip = TripsService.addTrip(fakedTripData);
        }).toThrow(Error);
      });

      it("should trigger an error if already closed", async () => {
        expect(() => {
          const savedTrip = TripsService.addTrip(fakedTripData);
          TripsService.close(savedTrip._id);
          TripsService.close(savedTrip._id);
        }).toThrow(Error);
      });
    });
  }));

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
const fakedMeasurementData = {
  firstName: "Dummy",
  lastName: "User",
  username: "dummyUser",
  email: "dummy@user.com",
  password: "********",
  role: "student",
};

describe("a measurement when posted", () => {
  //aggiungo un measurement e me lo ritrovo  con i dati che ho inserito

  it("should be persisted correctly", async () => {});
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
