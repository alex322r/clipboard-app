import express from "express";
//import User from ""
import Delete from "../models/delete.js";
const deleteRouter = express.Router();

//route to delete All
deleteRouter.get("/", (req, res) => {
  Delete.deleteAll((err) => {
    if (err) {
      res.status(500).send({ mesagge: "error" });
      return;
    }
    res.status(200).send({ message: "table truncate" });
  });
});

export default deleteRouter;
