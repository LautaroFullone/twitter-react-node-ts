import express, { Request, Response } from "express";

const app = express();

const PORT = process.env.PORT || 3040;

app.get("/", (req: Request, res: Response) => {
  res.send("Full Clone 2");
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto: ${PORT}`);
});
