const { createSchema } = require("./../utils/models.utils");

const imageSchema = createSchema("Image", "Images", (mongoose) => ({
  mimeType: {
    type: String,
    required: true,
  },
}));

module.exports = imageSchema;
