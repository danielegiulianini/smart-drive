exports.ok = (body) => jsonResult(200, body);

exports.created = (body) => jsonResult(201, body);

exports.badRequest = (error) => jsonResult(400, { error });

exports.unauthorized = () =>
  jsonResult(401, { error: "User is not authenticated" });

exports.forbidden = (error) =>
  jsonResult(403, {
    error: error || "User is not authorized to perform this action",
  });

exports.notFound = (error) => jsonResult(404, { error });

exports.internalServerError = (error) => jsonResult(500, { error });

exports.notImplemented = () => jsonResult(501, { error: "Not implemented" });

exports.imageResult = (imageBuffer, mime) => (res) =>
  res.status(200).header("Content-Type", mime).send(imageBuffer);

function jsonResult(status, body) {
  return function (res) {
    console.log("Status:", status);
    console.log("Response:", body);
    res.status(status).json(body);
  };
}
