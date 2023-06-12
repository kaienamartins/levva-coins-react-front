import jwt from "jsonwebtoken";

export function validateToken() {
  const token = localStorage.getItem("token");

  if (!token) return false;

  return jwt.verify(token.split(" ")[1], "levva-coins-secret", (error) => {
    return error ? false : true;
  });
}
