import express from "express"
const app = express()
import dotenv from "dotenv"
dotenv.config()
import expressLayouts from "express-ejs-layouts"
import mongoose from "mongoose"
import bodyParser from "body-parser" // to acces the element from the server
import cors from "cors"

import indexRouter from "./routes/index.mjs"
import playerRouter from "./routes/players.mjs"

const port = process.env.PORT || 5000

app.set('view engine', 'ejs')
app.set("views", "/home/alizee/testApiDb" + "/views")
app.set("layout", "layouts/layout")
app.use(expressLayouts)
app.use(express.static("public"))

////Middlewares
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ limit : '10mb', extended : false }))

app.use("/", indexRouter)
app.use("/players", playerRouter)

////2. Routes de base
//app.get("/", (req, res) => {
//  res.send("We are on home")
//})

//3. Connexion a l'atlas
mongoose
  .connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Atlas connected!")
  })
  .catch((err) => {
    console.log(err)
  })

// 1. Create a server
app.listen(port, () => {
  console.log(`Listen on port ${port}`)
})
