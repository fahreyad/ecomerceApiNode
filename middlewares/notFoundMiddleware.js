const notFoundMiddleware = (req, res) => res.status(404).send("route not found");

module.exports = notFoundMiddleware;
