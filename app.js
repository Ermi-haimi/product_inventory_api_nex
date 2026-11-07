import express from "express";
import router from "./routes/productRoutes.js";

const app = express();
const PORT = 5000;

app.use(express.json());

app.use("/products", router);

app.listen(PORT, () => {
  console.log(`running on port ${PORT} ...`);
});
