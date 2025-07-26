import { useEffect, useState, type ChangeEvent } from 'react'
import './App.css'
import Upload from './Upload'

type ImageEntry = {
  id: number
  name: string
  filename: string
  imageUrl: string
}

function App() {

  const [images, setImages] = useState<ImageEntry[]>([])
  const [upload, setUpload] = useState<boolean>(false)
  const [imageSearch, setImageSearch] = useState<string>('')


  const refreshImages = async () => {
    const res = await fetch('http://localhost:5000/images')
    const data = await res.json()
    setImages(data)
  }

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('http://localhost:5000/images')
        const data = await response.json()
        setImages(data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchImages()

  }, [])

  const filteredImages = images.filter(image =>
    image.name.toLowerCase().includes(imageSearch.toLowerCase())
  )

  const handleUpload = () => {
    setUpload(true)
  }

  const handleDelete = async (id: number) => {
    try {
      console.log(id)
      await fetch(`http://localhost:5000/delete/${id}`, {
        method: 'DELETE'
      })
      setImages(prev => prev.filter(img => img.id !== id))
    } catch (error) {
      console.log(error)
    }
  }

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImageSearch(e.target.value)
  }
  
  return (
    <div>
      <input 
        placeholder='Search images...' 
        onChange={handleSearchChange} 
        value={imageSearch}
        className='image-search'
      />
      <button onClick={handleUpload}>Upload</button>
      {upload && <Upload setUpload={setUpload} refreshImages={refreshImages}/>}
      <h2>{filteredImages.length} images</h2>
      <div className='images'>
        {filteredImages.map(({id, imageUrl, name}) => (
          <div className='image-container' key={id} role="button" onClick={() => handleDelete(id)}>
            <p>{name}</p>
            <img
              alt={name}
              src={imageUrl}
            />
            </div>
        ))}
      </div>
    </div>
  )
}

export default App
