import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button } from "reactstrap";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    // Fetch all users
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/api/users", {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        });
        setUsers(res.data);
      } catch (err) {
        console.error(err.message);
      }
    };

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

    // Fetch all reservations
    const fetchReservations = async () => {
      try {
        const res = await axios.get("/api/reservations", {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        });
        setReservations(res.data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchUsers();
    fetchItems();
    fetchReservations();
  }, []);

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`/api/users/${id}`, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      setUsers(users.filter((user) => user._id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`/api/items/${id}`, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      setItems(items.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDeleteReservation = async (id) => {
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
      <h1>Admin Dashboard</h1>
      <h2>Users</h2>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Button
                  color="danger"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h2>Items</h2>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.location}</td>
              <td>
                <Button
                  color="danger"
                  onClick={() => handleDeleteItem(item._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h2>Reservations</h2>
      <Table>
        <thead>
          <tr>
            <th>Item</th>
            <th>User</th>
            <th>From</th>
            <th>To</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation._id}>
              <td>{reservation.item.name}</td>
              <td>{reservation.user.name}</td>
              <td>{new Date(reservation.from).toLocaleString()}</td>
              <td>{new Date(reservation.to).toLocaleString()}</td>
              <td>
                <Button
                  color="danger"
                  onClick={() => handleDeleteReservation(reservation._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminDashboard;
