import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

export const valideToken = asyncHandler(async (req, res, next) => {
  let token;
  const authHeader = req.headers.Authorization || req.headers.authorization;
  if ( authHeader && authHeader.startsWith("Bearer") ) {
    try {
      token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.SECRET_ACCESS_TOKEM);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Pas Autorisé, token invalide");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Pas Autorisé,  pas de token");
  }
})