//all the things here are already set up
//add some test data (with predictable corresponding services return values)

beforeAll(async () => {
  try {
    await dbUtil.connect();
  } catch (err) {
    console.log(err);
  }
});

afterAll(async () => {
  try {
    await dbUtil.disconnect();
  } catch (err) {
    console.log(err);
  }
});

test("List all users have read a book", async () => {
  const books = await bookReadService.list(volumeId);

  expect(books).toBeDefined();
  expect(books.length).toBeGreaterThanOrEqual(0);
});
