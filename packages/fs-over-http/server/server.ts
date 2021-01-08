import fs from "fs"
import express from "express"
import { Request, Response } from "express"

//import cors from 'cors'
const cors = require("cors")

const app: express.Application = express()

app.use(cors())

app.get("", (_, res) => {
  console.log("something")
  res.send("hello")
})

app.get("/files/:path(*)", (req: Request, res: Response) => {
  console.log("skrrr", req.params.path)
  try {
    res.sendFile(req.params.path)
  } catch (err) {
    res.status(500).json({ err: "Something went wrong" })
  }
})

app.put("/files/:path(*)", (req, res) => {
  try {
    console.log("put file", req.params)
    req.pipe(fs.createWriteStream(req.params.path))
    //fs.writeFileSync(req.params.path, req.body)
    res.json({}).send()
  } catch (err) {
    res.status(500).send()
  }
})

const port = process.env.PORT ?? 7500
app.listen(port, function () {
  console.log(`FS is listening on port ${port}!`)
})
