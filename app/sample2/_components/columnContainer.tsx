"use client";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { PlusCircleIcon, Trash2Icon } from "lucide-react";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import TaskBar from "./taskbar";
import { Column_Type, dndCard } from "@/lib/data";

interface Props {
  column: Column_Type;
  tasks: dndCard[];
}

function ColumnContainer({ column, tasks }: Props) {
  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
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
        className="bg-slate-600 opacity-40 border-2 border-slate-500 w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col "
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className=" bg-slate-600 w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col"
    >
      <div
        {...attributes}
        {...listeners}
        className=" bg-slate-300 text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-slate-600 border-4 flex items-center justify-between "
      >
        <div className="flex gap-2">
          <div className=" flex justify-center items-center bg--slate-600 px-2 py-1 text-sm rounded-full ">
            {tasks.length}
          </div>
          {column.name}
        </div>
      </div>
      <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskBar key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}

export default ColumnContainer;
