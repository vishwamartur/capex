import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "reactstrap";

const ProductAvailability = () => {
  const [items, setItems] = useState([]);

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

  return (
    <div>
      <h1>Product Availability</h1>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Status</th>
            <th>Team</th>
            <th>Project</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.location}</td>
              <td>{item.available ? "Available" : "Reserved"}</td>
              <td>{item.team || "N/A"}</td>
              <td>{item.project || "N/A"}</td>
              <td>{item.username || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ProductAvailability;
