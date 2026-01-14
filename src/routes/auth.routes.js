import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { users, wallets, generateId } from "../data/store.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const userId = generateId();
  users.push({ id: userId, email, password: hashedPassword });
  wallets.push({ userId, balance: 0 });

  res.json({ message: "User registered" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

  res.json({
    token,
    userId: user.id
  });
});

export default router;
