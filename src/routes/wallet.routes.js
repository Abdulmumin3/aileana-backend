import express from "express";
import Wallet from "../models/Wallet.js";
import auth from "../middleware/auth.middleware.js";
import { initiatePayment } from "../services/monnify.mock.js";

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const wallet = await Wallet.findOne({ userId: req.user.id });
  res.json(wallet);
});

router.post("/fund", auth, async (req, res) => {
  const payment = initiatePayment(req.body.amount);
  res.json(payment);
});

router.post("/webhook", async (req, res) => {
  const wallet = await Wallet.findOne({ userId: req.body.userId });
  wallet.balance += req.body.amount;
  await wallet.save();
  res.json({ message: "Wallet funded" });
});

export default router;
