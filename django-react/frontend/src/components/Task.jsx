import { useSortable } from "@dnd-kit/sortable";
import React from "react";
import { CSS } from "@dnd-kit/utilities";

function Task({ id, title }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div
      className="column-item"
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
      <input type="checkbox" />
      {title}
    </div>
  );
}

export default Task;
