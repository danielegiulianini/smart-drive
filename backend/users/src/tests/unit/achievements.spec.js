const {
  dbConnect,
  dbDisconnect,
  dropCollections,
} = require("../../utils/dbHandler.utils");

beforeAll(async () => dbConnect());
afterAll(async () => dbDisconnect());
afterEach(async () => {
  await dropCollections();
});

//notes on testing:
//all the if-else branches
//edge cases
//check:
//- return values
//- side effects
//- exceptions to be thrown

//unlock achievements
//unlock multiple achievements
//not unlock what must not be unlocked
