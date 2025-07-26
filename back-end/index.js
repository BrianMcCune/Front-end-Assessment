const express = require('express')
const multer = require('multer')
const cors = require('cors')
const path = require('path')
const fs = require('fs')

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

let imageStore = []

if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads')
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    const ext = path.extname(file.originalname)
    cb(null, file.fieldname + '-' + uniqueSuffix + ext)
  }
})

const upload = multer({ storage })

app.post('/upload', upload.single('image'), (req, res) => {
  const { name } = req.body
  const file = req.file

  if (!file || !name) {
    return res.status(400).json({ error: 'Both image and name are required' })
  }

  const imageEntry = {
    id: Date.now(),
    name,
    filename: file.filename,
    imageUrl: `http://localhost:${PORT}/uploads/${file.filename}`
  }

  imageStore.push(imageEntry)

  res.status(200).json(imageEntry)
})

// GET
app.get('/images', (req, res) => {
  res.json(imageStore)
})

// DELETE
app.delete('/delete/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const index = imageStore.findIndex(item => item.id === id)

  if (index === -1) {
    return res.status(404).json({ error: 'Image not found' })
  }

  const [deleted] = imageStore.splice(index, 1)
  const filePath = path.join(__dirname, 'uploads', deleted.filename)

  fs.unlink(filePath, err => {
    if (err) {
      console.error('Error deleting file:', err)
      return res.status(500).json({ error: 'Failed to delete image file' })
    }

    res.json({ message: 'Image and entry deleted successfully' })
  })
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
