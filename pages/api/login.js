const jwt = require("jsonwebtoken");

export default function login(req, res) {
  try {
    // Get user input
    const { username } = req.body;

    // Create token
    const token = jwt.sign({ data: username }, "test", {
      expiresIn: "1m",
    });
    console.log(token);
    // user
    res.status(200).json({ token });
  } catch (err) {
    console.log(err);
  }
}
