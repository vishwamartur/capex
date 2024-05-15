import React, { useEffect, useState } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "bootstrap/dist/css/bootstrap.min.css";

const ReservationCalendar = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await axios.get("/api/reservations", {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        });
        const formattedReservations = res.data.map((reservation) => ({
          title: reservation.item.name,
          start: reservation.from,
          end: reservation.to,
          backgroundColor: reservation.item.available ? "green" : "red",
        }));
        setReservations(formattedReservations);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchReservations();
  }, []);

  return (
    <div>
      <h1>Reservation Calendar</h1>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={reservations}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
      />
    </div>
  );
};

export default ReservationCalendar;
