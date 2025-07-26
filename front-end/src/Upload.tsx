import React, { useState, type ChangeEvent, type FormEvent } from "react";

type UploadProps = {
    setUpload: React.Dispatch<React.SetStateAction<boolean>>
    refreshImages: () => Promise<void>
}

const Upload = ({setUpload, refreshImages}: UploadProps) => {

    const [name, setName] = useState<string>('')
    const [file, setFile] = useState<File>()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        console.log(file, name)
            const data = new FormData()
        if (file) {
            data.append('image', file)
        }
        data.append('name', name)

        try {
            const response = await fetch('http://localhost:5000/upload', {
                method: 'POST',
                body: data
            })

            const result = await response.json()
            console.log(result)
            await refreshImages()
            setUpload(false) 
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files?.[0])
    }

    return ( 
        <div className="upload-container">
            <button className="close-btn" onClick={() => setUpload(false)}>X</button>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    required
                />
                <input 
                    type="file"
                    accept="image/*"
                    name="image"
                    onChange={handleImageChange}
                    required
                />
                <button className="submit-btn" type="submit">Upload Image</button>
            </form>
        </div>
     );
}
 
export default Upload;