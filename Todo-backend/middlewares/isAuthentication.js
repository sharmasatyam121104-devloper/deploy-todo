import jwt from "jsonwebtoken";
import User from "../models/User.Models/User.models.js";

const isAuthentication = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  jwt.verify(token, "secretkey", async (err, decoded) => {
    if (err) {
      const error = new Error(err?.message);
      next(err);
      // return res.status(500).json({
      //   status: "Failed",
      //   message: error?.message || "Not able to find token",
      // });
    }
    else{
        const userId = decoded?.user?.id
        const user = await User.findById(userId).select("username email _id");
        req.userAuth = user;
    }
     next();
  });
 
};

export default isAuthentication;
