import React, { useReducer, useState } from "react";

export const ToDoList = () => {

  const tasksReducer = (state, action) => {

    switch (action.type) {
      case "ADD_TASK":
        return [...state, {id: Date.now(), text: action.text, completed: false}];

      case "TOGGLE_TASK":
        return state.map(task => task.id === action.id ? {...task, completed: !task.completed} :  task)

      case "DELETE_TASK":
        return state.filter((task) => task.id !== action.id);
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
    dispatch({ type: "ADD_TASK", text: newTask});
    setNewTask("");
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
        {tasks.map((task) => (
          <li key={task.id}>
            <label>
            <input type="checkbox" checked={task.completed} onChange={()=> dispatch({type: "TOGGLE_TASK", id: task.id})}/>
            </label>
            {task.text}
            <button onClick={() =>dispatch({type: "DELETE_TASK", id: task.id})}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
