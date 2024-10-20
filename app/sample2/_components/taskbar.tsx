"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { dndCard } from "@/lib/data";

interface Props {
  task: dndCard;
}

function TaskBar({ task }: Props) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: false,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="opacity-30 bg-slate-300 p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl border-2 border-slate-500  cursor-grab relative "
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-slate-300 p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-4 hover:ring-inset hover:ring-slate-800 cursor-grab relative task"
    >
      <p className="my-auto h-[90%] w-full overflow-y-hidden overflow-x-hidden whitespace-pre-wrap">
        {task.name}
      </p>
    </div>
  );
}

export default TaskBar;
