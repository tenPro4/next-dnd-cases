export type dndCard = {
    id: string;
    name: string;
    order: number;
    columnId:string;
  };
  
  export type Column_Type = {
      id: string;
    name: string;
    order: number;
    cards: dndCard[];
  };

  
  export const defaultData = [
    {
      id:"col-1",
      name: "C1",
      order: 1,
      cards: [
        {
          id: "1",
          name: "C1-T1",
          order: 1,
          columnId:"col-1"
        },
        {
          id: "2",
          name: "C1-T2",
          order: 2,
          columnId:"col-1"
        },
        {
          id: "3",
          name: "C1-T3",
          order: 3,
          columnId:"col-1"
        },
      ],
    },
    {
      id:"col-2",
      name: "C2",
      order: 2,
      cards: [
        {
          id: "4",
          name: "C2-T1",
          order: 1,
          columnId:"col-2"
        },
        {
          id: "5",
          name: "C2-T2",
          order: 2,
          columnId:"col-2"
        },
        {
          id: "6",
          name: "C2-T3",
          order: 3,
          columnId:"col-2"
        },
      ],
    },
    {
      id:"col-3",
      name: "C3",
      order: 3,
      cards: [
        {
          id: "7",
          name: "C3-T1",
          order: 1,
          columnId:"col-3"
        },
        {
          id: "8",
          name: "C3-T2",
          order: 2,
          columnId:"col-3"
        },
        {
          id: "9",
          name: "C3-T3",
          order: 3,
          columnId:"col-3"
        },
      ],
    },
  ] as Column_Type[];
  