//handles score assignment
//aggregation pipelines




Trip.findOneAndUpdate(
    {
      _id: tripId,
    },
    newMeasurementParams,
    {
      new: true, //<new> option to true to return the document after update was applied.
    }
    // with <upsert> option set to true (default to false) this call behaves like a normal findOneAndUpdate()
    // if it finds a document that matches filter.
    // But, if no document matches filter, MongoDB will insert one by combining filter and update as shown below.
  );