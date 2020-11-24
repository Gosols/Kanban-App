import React, { useEffect, useState } from "react";
import Column from "./Column";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import "../styles/Kanban.css";

export default function KanbanTable() {
  const url = "https://tickets-backend-gosols.herokuapp.com/tickets";
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  // contains all tickets. has default data set
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch(proxyUrl + url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTickets(data);
      });
  }, []);

  // function used to move ticket from column to column
  // passed down to columns as a prop
  const moveTicket = (text, category) => {
    let tempArr = []; // temporary array
    tickets.forEach((ticket) => {
      if (ticket.text === text) {
        console.log(ticket._id);
        fetch(proxyUrl + url + ticket._id, {
          method: "patch",
          body: JSON.stringify({ newCategory: category }),
        });
        ticket.category = category;
      }
      tempArr.push(ticket);
    });

    setTickets(tempArr);
  };
  // passed down to columns
  const addTicket = (ticket) => {
    setTickets([...tickets, ticket]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container">
        <div>
          <h1 className="header">Kanban Table</h1>
          <div className="kanban">
            <Column
              header="ToDo"
              allTickets={tickets}
              moveTicket={moveTicket}
              addTicket={addTicket}
              category="todo"
            />
            <Column
              header="In Progress"
              allTickets={tickets}
              moveTicket={moveTicket}
              addTicket={addTicket}
              category="ip"
            />
            <Column
              header="Done"
              allTickets={tickets}
              moveTicket={moveTicket}
              addTicket={addTicket}
              category="done"
            />
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
