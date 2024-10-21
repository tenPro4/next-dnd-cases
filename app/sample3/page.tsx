"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { defaultData, Column_Type } from "@/lib/data";
import { cn } from "@/lib/utils";
import { CaretDownIcon, CaretUpIcon } from "@radix-ui/react-icons";
import { PlusIcon, TrashIcon } from "lucide-react";
import React, { useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

const page = () => {
  const [data, setData] = useState(defaultData);

  const onDragEnd = (dropResult: DropResult) => {
    const { destination, source, type } = dropResult;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    )
      return;

    if (type === "COLUMN") {
      const _cols = [...data];
      const [removed] = _cols.splice(source.index, 1);
      _cols.splice(destination.index, 0, removed);
      _cols
        .map((col, idx) => {
          return { ...col, order: idx };
        })
        .sort((a, b) => a.order - b.order);

      setData(_cols);
      return;
    }

    //reorder cards
    let _cols = [...data];
    const oriCol = _cols.find((x) => x.id === source.droppableId);
    const destinationCol = _cols.find(
      (x) => x.id === destination.droppableId
    );

    //if column not find and just exit
    if (!oriCol || !destinationCol) return;

    // moving within same column
    if (source.droppableId === destination.droppableId) {
      const newOrderedCards = [...oriCol.cards]
        .toSpliced(source.index, 1)
        .toSpliced(destination.index, 0, oriCol.cards[source.index])
        .map((item, idx) => {
          return { ...item, order: idx };
        });
      oriCol.cards = newOrderedCards;

      setData(_cols);

      return
    }

    //moving accross different columns
    const [currentCard] = oriCol.cards.splice(source.index, 1);

    oriCol.cards.forEach((card, idx) => {
    card.order = idx;
    });

    destinationCol.cards.splice(destination.index, 0, {
    ...currentCard,
    columnId: destination.droppableId,
    });

    destinationCol.cards.forEach((card, idx) => {
    card.order = idx;
    });
    setData(_cols);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId="board"
        type="COLUMN"
        direction="vertical"
        key="boards"
      >
        {(provided) => (
          <div
            className="flex flex-col gap-4 mt-4 p-[100px]"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {data.map((d, index) => (
              <CollectionCard data={d} index={index} key={`col-${d.id}`} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

const CollectionCard = ({
  data,
  index,
}: {
  data: Column_Type;
  index: number;
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const tasks = data.cards;

  return (
    <Draggable draggableId={`col-${data.id}`} index={index}>
      {(columnDragProvided) => (
        <div
          {...columnDragProvided.draggableProps}
          ref={columnDragProvided.innerRef}
          className="h-full"
        >
          <div
            className="flex w-full justify-between p-6 bg-slate-400"
            {...columnDragProvided.dragHandleProps}
          >
            <span className="font-bold">{data.name}</span>
            <div>
              {!isOpen && (
                <CaretDownIcon
                  className="h-6 w-6 cursor-pointer"
                  onClick={() => setIsOpen((x) => !x)}
                />
              )}
              {isOpen && (
                <CaretUpIcon
                  className="h-6 w-6 cursor-pointer"
                  onClick={() => setIsOpen((x) => !x)}
                />
              )}
            </div>
          </div>
          {isOpen && (
            <>
              <Droppable droppableId={data.id} type="ticket">
                {(cardProvided) => (
                  <div
                    className="p-4 gap-3 flex flex-col"
                    {...cardProvided.droppableProps}
                    ref={cardProvided.innerRef}
                  >
                    {tasks.map((task, index) => (
                      <Draggable
                        draggableId={`card-${task.id}`}
                        index={index}
                        key={task.id}
                      >
                        {(cardDragProvided) => (
                          <div
                            className="flex gap-2 items-start hover:border-slate-600 hover:border-2"
                            {...cardDragProvided.draggableProps}
                            {...cardDragProvided.dragHandleProps}
                            ref={cardDragProvided.innerRef}
                          >
                            <label
                              htmlFor={task.id.toString()}
                              className={cn(
                                "cursor-grab text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 decoration-1 dark:decoration-white"
                              )}
                            >
                              {task.name}
                            </label>
                          </div>
                        )}
                      </Draggable>
                    ))}
                     {cardProvided.placeholder}
                  </div>
                )}
              </Droppable>

              <Separator />
              <footer className="h-[40px] px-4 p-[2px] text-xs text-neutral-500 flex justify-end items-center">
                <Button size={"icon"} variant={"ghost"}>
                  <PlusIcon />
                </Button>
                <Button size={"icon"} variant={"ghost"}>
                  <TrashIcon />
                </Button>
              </footer>
            </>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default page;
