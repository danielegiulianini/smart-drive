//THIS IS IMPORTANT

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

//fixtures

const fakedTripData = {
  firstName: "Dummy",
  lastName: "User",
  username: "dummyUser",
  email: "dummy@user.com",
  password: "********",
  role: "student",
};

beforeAll(async () => dbConnect());
afterAll(async () => dbDisconnect());
afterEach(async () => {
  await dropCollections();
});
