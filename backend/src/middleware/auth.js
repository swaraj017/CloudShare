import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ code: "unauthorized" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, "file-store-sys");
    req.user = decoded; // sets req.user.id
    next();
  } catch {
    return res.status(401).json({ code: "unauthorized" });
  }
};
 