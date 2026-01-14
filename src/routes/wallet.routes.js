import express from "express";
import auth from "../middleware/auth.middleware.js";
import { wallets } from "../data/store.js";
import { initiatePayment } from "../services/monnify.mock.js";

const router = express.Router();

router.get("/", auth, (req, res) => {
  const wallet = wallets.find(w => w.userId === req.user.id);
  res.json(wallet);
});

router.post("/fund", auth, (req, res) => {
  const payment = initiatePayment(req.body.amount);
  res.json(payment);
});

router.post("/webhook", (req, res) => {
  const { userId, amount } = req.body;
  const wallet = wallets.find(w => w.userId === userId);

  if (!wallet) {
    return res.status(404).json({ message: "Wallet not found" });
  }

  wallet.balance += amount;
  res.json({ message: "Wallet funded" });
});

export default router;
