import express from "express";
import db from "./db.js";
import cors from "cors";
import crypto from "crypto"
import e from "child_process"

const exec = e.exec
const PORT = process.env.PORT;
const app = express();
const secret = process.env.SECRET;
const repo = "/var/www/web"


import textRouter from "./routes/texts.js";
import deleteRouter from "./routes/delete.js";

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.send({ message: "hello World" });
});

app.post("/api/webhook", (req, res) => {
  let signature = req.headers['x-hub-signature']
  if (!signature) {
    return res.status(400).send('no signature provide')
  }
  let hmac = crypto.createHmac('sha1', secret)
  let digest = 'sha1=' + hmac.update(JSON.stringify(req.body)).digest('hex')
  if (signature !== digest) {
    return res.status(401).send('invalid signature')
  }

  exec(`cd ${repo} && git pull`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`)
      return res.status(500).send('Error executing git pull')
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
    res.status(200).send('Git pull executed successfully');

  })

})

app.use("/api/texts", textRouter);
app.use("/api/delete", deleteRouter);

app.listen(PORT || 5000, () => {
  console.log(`the server is listening in ${PORT || 5000}`);
});

// Cerrar la base de datos cuando se cierra el proceso
process.on("SIGINT", () => {
  db.close();
  console.log("Base de datos cerrada");
  process.exit(0);
});
