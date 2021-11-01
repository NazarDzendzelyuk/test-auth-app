const unAuth = ["One", "Two", "Three"];
const authOfferings = [...unAuth, "Four", "Five", "Six"];

export default function offerings(req, res) {
  try {
    const { authorization } = req.headers;
    console.log(authorization);
    const data = authorization && JSON.parse(authorization) ? authOfferings : unAuth;

    res.status(200).json({ data });
  } catch (err) {
    console.log(err);
  }
}
