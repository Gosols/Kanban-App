import React from "react";
import { useDrag } from "react-dnd";
import "../styles/Ticket.css";
import { itemTypes } from "../types";

export default function Ticket({ text }) {
  // hook from the react-dnd library
  // makes this component draggable
  const [{ isDragging }, drag] = useDrag({
    item: { type: itemTypes.TICKET, text: text },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="ticket"
    >
      <p className="text">{text}</p>
    </div>
  );
}
