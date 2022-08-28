exports.createSchema = function(modelName, collectionName, schemaDefinition) {
    return function(mongoose) {
      let Schema = mongoose.Schema
      let schemaObject = new Schema(schemaDefinition(mongoose))
      return mongoose.model(modelName, schemaObject, collectionName)
    }
  }