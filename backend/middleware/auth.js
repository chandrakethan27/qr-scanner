import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(403).json({ error: "Access Denied. Token is missing." });
    }

    if (!token.startsWith("Bearer ")) {
      return res.status(403).json({ error: "Access Denied. Invalid token format." });
    }

    // Debugging: Check the value of the token
    console.log("Received token:", token);

    const tokenWithoutBearer=req.headers.authorization?.split(" ")[1]
    const verified = jwt.verify(tokenWithoutBearer, process.env.SECRET_KEY);
    req.user = verified;
    console.log(verified);
    next();
  } catch (err) {
    console.error("Token verification error:", err.message);

    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: "Unauthorized. Token has expired." });
    }
    return res.status(401).json({ error: "Unauthorized. Invalid token." });
  }
};



