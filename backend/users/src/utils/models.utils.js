exports.createSchema = function(modelName, collectionName, schemaDefinition, opt) {
    return function(mongoose) {
      let Schema = mongoose.Schema
      let schemaObject = new Schema(schemaDefinition(mongoose), opt)
      return mongoose.model(modelName, schemaObject, collectionName)
    }
  }