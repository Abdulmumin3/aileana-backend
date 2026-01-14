import express from "express";
import Call from "../models/Call.js";
import auth from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/start", auth, async (req, res) => {
  const call = await Call.create({
    userId: req.user.id,
    status: "started",
    startedAt: new Date()
  });
  res.json(call);
});

router.post("/end/:id", auth, async (req, res) => {
  const call = await Call.findById(req.params.id);
  call.status = "ended";
  call.endedAt = new Date();
  await call.save();
  res.json(call);
});

router.get("/", auth, async (req, res) => {
  const calls = await Call.find({ userId: req.user.id });
  res.json(calls);
});

export default router;
