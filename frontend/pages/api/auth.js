import axios from "axios";

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      // Handle user login
      try {
        const response = await axios.post(
          `${process.env.BACKEND_URL}/api/auth`,
          req.body,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // Set the token in cookies for future requests
        res.setHeader(
          "Set-Cookie",
          `token=${response.data.token}; HttpOnly; Path=/`
        );

        res.status(200).json(response.data);
      } catch (error) {
        res
          .status(error.response.status)
          .json({ message: error.response.data.message });
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
