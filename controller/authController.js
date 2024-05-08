const validateLogin = require("../validator/authValidator");
const { findByEmail } = require("../model/userModel");
const { verifyPassword } = require("../helper/argonHelper");
const { encodeJWT } = require("../helper/jwtHelper");

const login = async (req, res) => {
  try {
    const errors = validateLogin(req.body);
    if (errors) {
      return res.status(401).send(errors);
    }
    const [user] = await findByEmail(req.body.email);
    if (!user) {
      return res.status(401).send("Invalid Credentials");
    }
    const passwordVerification = await verifyPassword(user.password, req.body.password);
    if (!passwordVerification) {
      return res.status(401).send("Invalid Credentials");
    }
    delete user.password;
    const token = encodeJWT(user);
    // console.log("Token:", token);
    res.cookie("auth_token", token, { httpOnly: true, secure: true, maxAge: 3600000 }); // 1 hour expiration
    res.set('Authorization', `Bearer ${token}`);
    res.header('Access-Control-Expose-Headers', 'Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.status(200).json({ user: user.firstname, token, id: user.id });
  } catch (err) {
    console.error("Login error:", err);
    res.sendStatus(500); // Internal server error
  }
}
const logout = async (req, res) => {
  res.clearCookie("auth_token").sendStatus(200);
};
const checkAuthStatus = (req, res) => {
  console.log(req, res);
  // Vérifie si le cookie 'auth_token' est présent dans la requête
  console.log('Hello', req.cookies.auth_token);
  if (req.cookies.auth_token) {
    // Si le cookie est présent, l'utilisateur est authentifié
    res.status(200).send("User is still authenticated");
  } else {
    // Si le cookie n'est pas présent, l'utilisateur est déconnecté
    res.status(401).send("User is logged out");
  }

};



module.exports = { login, logout, checkAuthStatus };
