"use client";

import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import React, { useState } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { defaultData } from "@/lib/data";

const page = () => {
  const [columns, setColumns] = useState(defaultData);

  const onDragEnd = (dropResult: DropResult) => {
    const { destination, source, type } = dropResult;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    )
      return;

    if (type === "COLUMN") {
      const _cols = [...columns];
      const [removed] = _cols.splice(source.index, 1);
      _cols.splice(destination.index, 0, removed);
      _cols
        .map((col, idx) => {
          return { ...col, order: idx };
        })
        .sort((a, b) => a.order - b.order);

      setColumns(_cols);
      return;
    }

    //reorder cards
    let _cols = [...columns];
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

      setColumns(_cols);

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
    setColumns(_cols);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board" type="COLUMN" direction="horizontal" key="boards">
        {(provided) => (
          <div
            className="flex item-center scrollbar-thin overflow-x-auto gap-x-4"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {columns.map((column, index) => (
              <Draggable draggableId={`col-${column.id}`} index={index} key={`col-${column.id}`}>
                {(columnDragProvided) => {
                  return (
                    <div
                      {...columnDragProvided.draggableProps}
                      ref={columnDragProvided.innerRef}
                      className="h-full"
                    >
                      <div className="bg-slate-200/30 dark:bg-background/20 h-[700px] w-[300px] px-4 relative rounded-lg flex-shrink-0">
                        <div
                          {...columnDragProvided.dragHandleProps}
                          className=" h-14 backdrop-blur-lg dark:bg-background/40 bg-slate-200/60 absolute top-0 left-0 right-0 z-10 "
                        >
                          <div className="h-full flex items-center p-4 cursor-grab border-b-[1px] overflow-hidden">
                            <div className="flex items-center w-full">
                              <span className="font-bold text-sm">
                                {column.name}
                              </span>
                            </div>
                          </div>
                        </div>

                        <Droppable
                          droppableId={column.id}
                          type="ticket"
                        >
                          {(cardProvided) => (
                            <div
                              className="max-h-[700px] h-full w-full pt-12 overflow-auto scrollbar scrollbar-thumb-muted-foreground/20 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-medium z-[99999]"
                              {...cardProvided.droppableProps}
                              ref={cardProvided.innerRef}
                            >
                              {column.cards.map((card, index) => (
                                <Draggable
                                draggableId={`card-${card.id}`}
                                index={index}
                                key={card.id}
                              >
                                {(cardDragProvided) => {
                                    return (
                                        <div
                                        {...cardDragProvided.draggableProps}
                                        {...cardDragProvided.dragHandleProps}
                                        ref={cardDragProvided.innerRef}
                                      >
                                        <Card className="my-4 dark:bg-slate-900 bg-white shadow-none transition-all">
                                            <CardHeader className="p-[12px]">
                                                <span className="text-lg w-full">{card.name}</span>
                                                <CardDescription className="w-full ">
                                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                                </CardDescription>
                                            </CardHeader>
                                        </Card>
                                      </div>
                                    )
                                }}
                              </Draggable>
                              ))}
                              {cardProvided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      </div>
                    </div>
                  );
                }}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default page;
