import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET ?? "wrong";

export const isAuth = (req, res, next) => {
  const token = (req.headers.authorization ?? "").replace(/Bearer\s?/, "");

  if (token) {
    try {
      const data = jwt.verify(token, JWT_SECRET);

      req.userId = data.id;
    } catch (error) {
      return res.json({ error: "Нет доступа1", stack: error.stack });
    }
  } else return res.json({ error: "Нет доступа2" });
  next();
};
