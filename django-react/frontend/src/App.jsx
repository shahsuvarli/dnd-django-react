import { useState } from "react";
import "./App.css";
import { DndContext, closestCorners } from "@dnd-kit/core";
import Column from "./components/Column";
import { arrayMove } from "@dnd-kit/sortable";

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Task 1" },
    { id: 2, title: "Task 2" },
    { id: 3, title: "Task 3" },
  ]);

  const getTaskPos = (id) => tasks.findIndex((task) => task.id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id === over.id) return;

    setTasks((tasks) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);

      return arrayMove(tasks, originalPos, newPos);
    });
  };

  return (
    <div>
      <h1>My Tasks</h1>
      <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <Column tasks={tasks} />
      </DndContext>
    </div>
  );
}

export default App;
