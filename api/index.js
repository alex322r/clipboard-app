import express from "express"

const PORT = process.env.PORT
const app = express()



app.get("/api", (req, res) => {
  res.send({ message: "hello World" })
})


app.listen(PORT || 5000, () => {
  console.log(`the server is listening in ${PORT || 5000}`)
})
