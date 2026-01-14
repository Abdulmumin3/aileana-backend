import express from "express";
import auth from "../middleware/auth.middleware.js";
import { calls, generateId } from "../data/store.js";

const router = express.Router();

router.post("/start", auth, (req, res) => {
  const call = {
    id: generateId(),
    userId: req.user.id,
    status: "started",
    startedAt: new Date(),
    endedAt: null
  };

  calls.push(call);
  res.json(call);
});

router.post("/end/:id", auth, (req, res) => {
  const call = calls.find(c => c.id === req.params.id);
  if (!call) {
    return res.status(404).json({ message: "Call not found" });
  }

  call.status = "ended";
  call.endedAt = new Date();
  res.json(call);
});

router.get("/", auth, (req, res) => {
  const userCalls = calls.filter(c => c.userId === req.user.id);
  res.json(userCalls);
});

export default router;
