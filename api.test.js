import ElementApi from "@/api/ElementApi"
import bodyParser from "body-parser"
import express from 'express'

const app = express()
app.use(bodyParser.json())
const el = ElementApi.getPageElement('poster')
console.log(el)

app.listen(2000)