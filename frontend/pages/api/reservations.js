import axios from "axios";

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      // Handle retrieving reservations
      try {
        const response = await axios.get(
          `${process.env.BACKEND_URL}/api/reservations`,
          {
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": req.headers["x-auth-token"],
            },
          }
        );
        res.status(200).json(response.data);
      } catch (error) {
        res
          .status(error.response.status)
          .json({ message: error.response.data.message });
      }
      break;
    case "POST":
      // Handle creating a new reservation
      try {
        const response = await axios.post(
          `${process.env.BACKEND_URL}/api/reservations`,
          req.body,
          {
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": req.headers["x-auth-token"],
            },
          }
        );
        res.status(201).json(response.data);
      } catch (error) {
        res
          .status(error.response.status)
          .json({ message: error.response.data.message });
      }
      break;
    case "PUT":
      // Handle updating a reservation
      try {
        const response = await axios.put(
          `${process.env.BACKEND_URL}/api/reservations/${req.body.id}`,
          req.body,
          {
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": req.headers["x-auth-token"],
            },
          }
        );
        res.status(200).json(response.data);
      } catch (error) {
        res
          .status(error.response.status)
          .json({ message: error.response.data.message });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
