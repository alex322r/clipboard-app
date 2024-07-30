import express from "express"
import db from "./db.js"

const PORT = process.env.PORT
const app = express()

import textRouter from "./routes/texts.js"

app.use(express.json())

app.get("/api", (req, res) => {
  res.send({ message: "hello World" })
})

app.use("/api/texts", textRouter)


app.listen(PORT || 5000, () => {
  console.log(`the server is listening in ${PORT || 5000}`)
})

// Cerrar la base de datos cuando se cierra el proceso
process.on('SIGINT', () => {
  db.close();
  console.log('Base de datos cerrada');
  process.exit(0);
});
