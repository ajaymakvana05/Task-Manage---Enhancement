import { useEffect, useState } from "react";
import socket from "../../socket";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    socket.on("updateTask", (updatedTask) => {
      setTasks((prevTasks) => prevTasks.map(task => task._id === updatedTask._id ? updatedTask : task));
    });

    return () => {
      socket.off("updateTask");
    };
  }, []);

  return (
    <div>
      {tasks.map(task => (
        <div key={task._id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
