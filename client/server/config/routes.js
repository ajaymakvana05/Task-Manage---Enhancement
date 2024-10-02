import express from "express";
import { Task, User } from "./models.js";
import { sendPushNotification } from "./notificationService.js";

const router = express.Router();

router.post("/assignTask", async (req, res) => {
  const { taskId, assigneeId } = req.body;

  try {
    const task = await Task.findById(taskId);
    task.assignee = assigneeId;
    await task.save();

    const assignee = await User.findById(assigneeId);
    sendPushNotification(assignee.deviceToken, {
      notification: {
        title: "New Task Assigned",
        body: `You have been assigned a new task: ${task.title}`,
      },
    });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post("/addComment", (req, res) => {
  const { taskId, comment } = req.body;

  req.io.emit("newComment", { taskId, comment });

  res.json({ success: true });
});

export default router;
