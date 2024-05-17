import axios from "axios";

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      // Handle item search or retrieval
      const { q } = req.query; // Query parameter for searching
      try {
        const response = await axios.get(
          `${process.env.BACKEND_URL}/api/items`,
          {
            params: { q },
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
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
