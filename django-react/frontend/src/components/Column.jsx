import React from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Task from "./Task";

function Column({ tasks }) {
  return (
    <div className="column-container">
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        {tasks.map((item) => (
          <Task id={item.id} title={item.title} key={item.id} />
        ))}
      </SortableContext>
    </div>
  );
}

export default Column;
