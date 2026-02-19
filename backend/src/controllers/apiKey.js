import ApiKeys from "../models/apiKey.js";
import User from '../models/user.js';
import generateApiKey from "./generateApiKey.js";

export const createApiKey = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name } = req.body;

    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ message: "API key name is required" });
    }

    const keyString = generateApiKey();

    const newApiKey = new ApiKeys({
      user: userId,
      key: keyString,
      name: name.trim(),
    });

    await newApiKey.save();

    res.status(201).json({
      message: "API key created successfully",
      key: keyString,
      name: newApiKey.name,
      createdAt: newApiKey.createdAt,
      id: newApiKey._id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create API key" });
  }
};

export const getmyApiKey = async (req, res) => {
  try {
    const userId = req.user.id;

    const keys = await ApiKeys.find({
      user: userId, // lowercase
      revoked: false,
    }).select("key name createdAt");

    res.status(200).json(keys);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get API keys" });
  }
};

export const keyUsage = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select(
      "creditsUsed creditLimit"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      used: user.creditsUsed,
      limit: user.creditLimit,
      remaining: user.creditLimit - user.creditsUsed,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch usage" });
  }
};
