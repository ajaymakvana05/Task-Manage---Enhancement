import { Task } from "./models.js";

export const handleSocket = (socket, io) => {
  console.log("User connected");

  socket.on("taskUpdated", (task) => {
    Task.findByIdAndUpdate(task._id, task, { new: false }, (err, updatedTask) => {
      if (err) return console.error(err);
      io.emit("updateTask", updatedTask); 
    });
  });

  socket.on("commentAdded", (comment) => {
    io.emit("newComment", comment); 
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
};
