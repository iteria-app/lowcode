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
  try {
    res.sendFile(req.params.path)
  } catch (err) {
    res.status(500).json({ err: "Something went wrong" }).send()
  }
})

app.get("/dir/:path(*)", (req: Request, res: Response) => {
  try {
    const dir = fs.readdirSync(req.params.path)
    res.send(dir)
  } catch (err) {
    res.status(500).json({ err: "Something went wrong" }).send()
  }
})

app.put("/files/:path(*)", (req, res) => {
  try {
    console.log("put file", req.params.path)
    req.pipe(fs.createWriteStream(req.params.path))
    //fs.writeFileSync(req.params.path, req.body)
    return res.json({ message: "Success" }).send()
  } catch (err) {
    res.status(500).send()
  }
})

const port = process.env.PORT ?? 7500
app.listen(port, function () {
  console.log(`FS is listening on port ${port}!`)
})
