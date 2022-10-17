exports.ok = (body) => jsonResponse(200, body);

exports.created = (body) => jsonResponse(201, body);

exports.badRequest = (error) => jsonResponse(400, { error });

exports.unauthorized = () =>
  jsonResponse(401, { error: "User is not authenticated" });

exports.forbidden = (error) =>
  jsonResponse(403, {
    error: error || "User is not authorized to perform this action",
  });

exports.notFound = (error) => jsonResponse(404, { error });

exports.internalServerError = (error) => jsonResponse(500, { error });

exports.notImplemented = () => jsonResponse(501, { error: "Not implemented" });

exports.imageResult = (imageBuffer, mime) => (res) =>
  res.status(200).header("Content-Type", mime).send(imageBuffer);

function jsonResponse(status, body) {
  return function (res) {
    console.log("Status:", status);
    console.log("Response:", body);
    res.status(status).json(body);
  };
}
