import User from "../models/user.js";
import ApiKey from "../models/apiKey.js";
import generateApiKey from "./generateApiKey.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const UserRegister = async (req, res) => {
  try {
    const { username, email, pass } = req.body;

    if (await User.findOne({ email })) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashpass = await bcrypt.hash(pass, 10);

   
    const newUser = await User.create({
      username,
      email,
      password: hashpass,
    });

    //   auto key created
    const apiKey = await ApiKey.create({
      user: newUser._id,
      key: generateApiKey(),
      name: "default",
    });

     
    return res.status(201).json({
      message: `${username} registered successfully`,
      userId: newUser._id,
      apiKey: apiKey.key,  
    });

  } catch (err) {
    console.error("User not registered", err);
    return res.status(400).json({ message: "User not registered, try again" });
  }
};


 

export const UserLogin = async (req, res) => {
  const { email, pass } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not registered" });

  const isMatch = await bcrypt.compare(pass, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user._id },
    "file-store-sys",
    { expiresIn: "1d" }
  );

  res.status(200).json({
    message: "Login success",
    token
  });
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    const storageUsed = user.creditsUsed;
    const storageLimit = user.creditLimit;
    const storagePercent = Math.round((storageUsed / storageLimit) * 100);

    res.json({
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      storageUsed,
      storageLimit,
      storagePercent,
    });
  } catch (err) {
    console.error("getProfile error:", err);
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};
