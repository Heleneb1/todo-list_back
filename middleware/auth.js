const { decodeJWT } = require("../helper/jwtHelper");

const authorization = async (req, res, next) => {
  try {
    const headerBearerToken = req.headers["authorization"];
    if (!headerBearerToken) {
      throw new Error("Authorization header missing");
    }

    if (!headerBearerToken.startsWith('Bearer ')) {
      throw new Error("Invalid token format");
    }

    const token = headerBearerToken.split(" ")[1];
    if (!token) {
      throw new Error("Token not found after Bearer");
    }

    const userData = decodeJWT(token);  // Assurez-vous que cette fonction gère les exceptions internes

    console.info("Le token décodé :", userData);

    req.user = userData;  // Attacher les données utilisateur à la requête

    return next();
  } catch (err) {
    console.error("Authorization error:", err);
    res.status(401).send("Unauthorized: " + err.message);
  }
};

module.exports = authorization;
