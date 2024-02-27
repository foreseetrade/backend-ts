import app from "./app";
import { envPort } from "./config";

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(envPort, () => {
  console.log(`Server is running on port ${envPort}`);
});
