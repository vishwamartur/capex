import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Form, FormGroup, Label, Input } from "reactstrap";

const ProductReservation = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
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

    fetchItems();
  }, []);

  const handleReserve = async () => {
    if (!selectedItem || !fromDate || !toDate) {
      alert("Please select an item and dates.");
      return;
    }

    try {
      await axios.post(
        "/api/reservations",
        {
          item: selectedItem,
          from: fromDate,
          to: toDate,
        },
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );

      alert("Reservation successful!");
      // Clear the form
      setSelectedItem(null);
      setFromDate("");
      setToDate("");
    } catch (err) {
      console.error(err.message);
      alert("Failed to make reservation.");
    }
  };

  return (
    <div>
      <h1>Product Reservation</h1>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Status</th>
            <th>Reserve</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.location}</td>
              <td>{item.available ? "Available" : "Reserved"}</td>
              <td>
                <Button
                  color="primary"
                  disabled={!item.available}
                  onClick={() => setSelectedItem(item._id)}
                >
                  Reserve
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {selectedItem && (
        <Form>
          <FormGroup>
            <Label for="fromDate">From Date</Label>
            <Input
              type="datetime-local"
              name="from"
              id="fromDate"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="toDate">To Date</Label>
            <Input
              type="datetime-local"
              name="to"
              id="toDate"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </FormGroup>
          <Button color="success" onClick={handleReserve}>
            Confirm Reservation
          </Button>
        </Form>
      )}
    </div>
  );
};

export default ProductReservation;
