import React, { useReducer, useState } from "react";

export const ToDoList = () => {
  const tasksReducer = (state, action) => {
    switch (action.type) {
      case "ADD_TASK":
        return [...state, action.payload];
      case "DELETE_TASK":
        return state.filter((_, index) => index !== action.payload);
      default:
        return state;
    }
  };

  const [tasks, dispatch] = useReducer(tasksReducer, []);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim() === "") {
      return;
    }
    dispatch({ type: "ADD_TASK", payload: newTask });
    setNewTask("");
  };

  const deleteTask = (index) => {
    dispatch({ type: "DELETE_TASK", payload: index });
  };

  return (
    <div>
      <h2>TO DO LIST</h2>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add new task</button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
