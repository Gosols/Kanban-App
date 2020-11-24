import React, { useState } from "react";
import Ticket from "./Ticket";
import { useDrop } from "react-dnd";
import "../styles/Column.css";
import { itemTypes } from "../types";

export default function Column(props) {
  // stores the value of the input field
  const [inputText, setInputText] = useState("");

  // filters the tickets that have the same category
  // as the column
  const tickets = props.allTickets.filter(
    (ticket) => ticket.category === props.category
  );
  // makes this component able to recieve dragged items
  const [{ isOver }, drop] = useDrop({
    accept: itemTypes.TICKET,
    drop: (item) => props.moveTicket(item.text, props.category),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  // adds ticket to the column
  const addTicket = async () => {
    props.addTicket({ text: inputText, category: props.category });
    setInputText("");

    await fetch("http://localhost:4000/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: "kikkelis kokkelis" }),
    });
  };

  // this function executes each time the input field value changes
  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  return (
    <div className="containerCol">
      <h3 className="cHeader">{props.header}</h3>
      <div
        ref={drop}
        className="column"
        style={{ backgroundColor: isOver ? "#ffe0e0" : "white" }}
      >
        {tickets.map((ticket, i) => {
          return <Ticket key={i} text={ticket.text} />;
        })}
        <div className="addField">
          <input className="input" onChange={handleChange} value={inputText} />
          <button className="button" onClick={addTicket}>
            add
          </button>
        </div>
      </div>
    </div>
  );
}
