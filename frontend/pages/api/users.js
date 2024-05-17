import axios from "axios";

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      // Handle retrieving user profiles
      try {
        const response = await axios.get(
          `${process.env.BACKEND_URL}/api/users`,
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
    case "PUT":
      // Handle updating user details
      try {
        const response = await axios.put(
          `${process.env.BACKEND_URL}/api/users/${req.body.id}`,
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
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
