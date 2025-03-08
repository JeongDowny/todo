import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const checkJWT = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    res.status(401).json({ message: "토큰이 필요합니다." });
    return;
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: "유효하지 않은 토큰입니다." });
    return;
  }
};

export default checkJWT;