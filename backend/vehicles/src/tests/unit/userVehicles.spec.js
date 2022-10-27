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

//to-test services
const UserVehicleService = require("../../services/userVehicles");
const UserVehicle = require("../../models/userVehicles");

//fixtures
/*  _id: //the so-called vehicleIdentificationNumber
    vehicleModelId:
    pictureUri:
    userId:
    createdAt: 
    updatedAt:
*/

const fakeUserVehicleData = {
  _id: "KM8JU3AC6DU588418", //vin
  vehicleModelId: 351215,
  pictureUri: "imageUri",
  userId: 56222,
};

describe("A User Vehicle service", () => {
  describe("when a vehicle is added for a user for the first time", () => {
    it("should return it correctly", async () => {
      const savedUserVehicle = await UserVehicleService.add(
        fakeUserVehicleData
      );

      expect(savedUserVehicle._id).toBe(fakeUserVehicleData._id);
      expect(savedUserVehicle.vehicleModelId).toBe(
        fakeUserVehicleData.vehicleModelId
      );
      expect(savedUserVehicle.pictureUri).toBe(fakeUserVehicleData.pictureUri);
      expect(savedUserVehicle.userId).toBe(fakeUserVehicleData.userId);
    });

    it("should persist it correctly", async () => {
      await UserVehicleService.add(fakeUserVehicleData);

      const fetchedUserVehicle = await UserVehicle.findById(
        fakeUserVehicleData._id
      );

      expect(fetchedUserVehicle._id).toBe(fakeUserVehicleData._id);
      expect(fetchedUserVehicle.vehicleModelId).toBe(
        fakeUserVehicleData.vehicleModelId
      );
      expect(fetchedUserVehicle.pictureUri).toBe(
        fakeUserVehicleData.pictureUri
      );
      expect(fetchedUserVehicle.userId).toBe(fakeUserVehicleData.userId);
    });
  });

  describe("when a user's vehicle is added twice", () => {
    it("should throw an error", async () => {
      await UserVehicleService.add(fakeUserVehicleData);

      expect(async () => {
        await UserVehicleService.add(fakeUserVehicleData);
      }).rejects.toThrow(Error);
    });
  });
  describe("when a user's vehicle is edited", () => {
    it("should persist the changes", async () => {
      const updatedPictureUri = "anotherImageUri";

      await UserVehicleService.add(fakeUserVehicleData);

      await UserVehicleService.edit(fakeUserVehicleData._id, {
        pictureUri: updatedPictureUri,
      });

      const fetchedUserVehicle = await UserVehicle.findById(
        fakeUserVehicleData._id
      );

      //changes to what to be changed
      expect(fetchedUserVehicle.pictureUri).toBe(updatedPictureUri);

      //no-changes to what to be not changed
      expect(fetchedUserVehicle._id).toBe(fakeUserVehicleData._id);
      expect(fetchedUserVehicle.vehicleModelId).toBe(
        fakeUserVehicleData.vehicleModelId
      );
      expect(fetchedUserVehicle.userId).toBe(fakeUserVehicleData.userId);
    });
  });

  describe("when a user's vehicle is removed", () => {
    it("should not list it anymore if asked", async () => {
      await UserVehicleService.add(fakeUserVehicleData);
      await UserVehicleService.remove(fakeUserVehicleData._id);
      expect(await UserVehicleService.get(fakeUserVehicleData._id)).toBeNull();
    });
  });

  describe("when retrieving the vehicles of a user", () => {
    it("should only list vehicles registered by him", async () => {
      const aUserId = 56222;
      const anotherUserId = 9993;
      const anotherAnotherUserId = 929;

      const firstUserVehicle1 = {
        _id: "KM8JU3AC6DU588418", //vin
        vehicleModelId: 351215,
        pictureUri: "imageUri",
        userId: aUserId,
      };

      const firstUserVehicle2 = {
        _id: "WDBAB23ADCB324720",
        vehicleModelId: 999235,
        pictureUri: "imageUri2",
        userId: aUserId,
      };

      const secondUserVehicle = {
        _id: "1FMZK05135GAGG488",
        vehicleModelId: 777777,
        pictureUri: "imageUri3",
        userId: anotherUserId,
      };

      vehiclesOfFirstUser = [firstUserVehicle1, firstUserVehicle2];

      //add (two) vehicles for the same user
      await UserVehicleService.add(firstUserVehicle1);
      await UserVehicleService.add(firstUserVehicle2);

      //add a vehicle for another user
      await UserVehicleService.add(secondUserVehicle);
      console.log("returned are:");
      console.log(
        await UserVehicleService.list({
          userId: aUserId,
        })
      );
      //the first (two) have to be listed as of the first user (the last one has not to be listed as of the first user)
      expect(
        (
          await UserVehicleService.list({
            userId: aUserId,
          })
        ).map((userVehicle) => userVehicle._id)
      ).toStrictEqual(
        vehiclesOfFirstUser.map((userVehicle) => userVehicle._id)
      );
    });
  });

  //other tests:
  //- non deve ritornare user's vehicles che non ho inserito
  //- removing a not-existing user's vehicle triggers error...
  //- check default values are applied
  //- check filtering vehicles by user
  //...
});
