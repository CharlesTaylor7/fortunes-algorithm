// for local development only
const express = require('express')
const ViteExpress = require('vite-express')
const fs = require('node:fs/promises')
const child_process = require('node:child_process')

const app = express()
app.use(express.json())

app.post('/graphviz', async (req, res) => {
  res.send('')

  console.log(req.body)
  const { fileName, content } = req.body
  const file = await fs.open(`graphs/${fileName}.txt`, 'w')
  await file.write(content)
  await file.close()
  child_process.execSync(`dot -Tsvg graphs/${fileName}.txt > graphs/${fileName}.svg`)
})

ViteExpress.listen(app, 3000, () => console.log('Server is listening...'))
