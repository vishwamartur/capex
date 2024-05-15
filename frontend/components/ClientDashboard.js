import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button } from "reactstrap";

const ClientDashboard = () => {
  const [items, setItems] = useState([]);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    // Fetch all items
    const fetchItems = async () => {
      try {
        const res = await axios.get("/api/items", {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        });
        setItems(res.data);
      } catch (err) {
        console.error(err.message);
      }
    };

    // Fetch user reservations
    const fetchReservations = async () => {
      try {
        const res = await axios.get("/api/reservations/user", {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        });
        setReservations(res.data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchItems();
    fetchReservations();
  }, []);

  const handleCancelReservation = async (id) => {
    try {
      await axios.delete(`/api/reservations/${id}`, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      setReservations(
        reservations.filter((reservation) => reservation._id !== id)
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <h1>Client Dashboard</h1>
      <h2>Available Items</h2>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.location}</td>
              <td>{item.available ? "Available" : "Reserved"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h2>My Reservations</h2>
      <Table>
        <thead>
          <tr>
            <th>Item</th>
            <th>From</th>
            <th>To</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation._id}>
              <td>{reservation.item.name}</td>
              <td>{new Date(reservation.from).toLocaleString()}</td>
              <td>{new Date(reservation.to).toLocaleString()}</td>
              <td>
                <Button
                  color="danger"
                  onClick={() => handleCancelReservation(reservation._id)}
                >
                  Cancel
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ClientDashboard;
