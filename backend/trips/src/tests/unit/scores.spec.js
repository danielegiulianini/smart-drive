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

beforeAll(async () => dbConnect());
afterAll(async () => dbDisconnect());
afterEach(async () => {
  await dropCollections();
});

//THIS IS IMPORTANT
test("List all users have read a book", async () => {
  const books = await bookReadService.list(volumeId);

  expect(books).toBeDefined();
  expect(books.length).toBeGreaterThanOrEqual(0);
});
