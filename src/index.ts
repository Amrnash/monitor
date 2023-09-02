import { app } from "./app";
import { runChecks } from "./poll";

require("dotenv").config();
const PORT = process.env.PORT;

app.listen(PORT, () => {
  runChecks();
  console.log(`Server is running on ${PORT}`);
});
