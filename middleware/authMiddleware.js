const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.cookies.auth_token;
  // console.log("Token authMiddleware:", token);
  if (token) {
    try {
      // Vérifier et décoder le token JWT
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      // Le token est valide, accéder aux informations de l'utilisateur à partir de decoded
      req.user = decoded;
      next();
    } catch (err) {
      // Loguer l'erreur pour le débogage
      console.error("Error verifying JWT:", err);
      // Le token est invalide ou a expiré
      res.status(401).send('Unauthorized: Invalid or expired token');
    }
  } else {
    // Aucun token trouvé dans les cookies
    res.status(401).send('Unauthorized: No authentication token provided');
  }
};

module.exports = authMiddleware;
