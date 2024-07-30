import express from "express"
//import User from ""
import Text from "../models/text.js"
const textRouter = express.Router()

//route to get all texts 



textRouter.get('/', (req, res) => {
  Text.getAll((err, rows) => {
    if (err) {
      res.status(500).send(err.message)
      return;
    }
    res.json(rows);
  })
})

textRouter.post('/', (req, res) => {
  const { id, text } = req.body
  Text.create(id, text, (err) => {
    if (err) {
      res.status(500).send(err.message)
      return;
    }
    res.status(201).send('texto creado')
  })
})

export default textRouter;

