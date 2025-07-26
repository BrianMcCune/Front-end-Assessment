# Front-End Assessment

A simple full-stack application that allows users to:

- Upload images with custom names
- View all uploaded images
- Filter images by name
- Delete individual images

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript (Vite)
- **Backend**: Node.js + Express (Mock API using local file storage)

## ⏱️ Time Spent

Approximately **6 hours**

## 🚀 Future Improvements

- Improve layout and styling (possibly using GSAP animations and a consistent soft blue theme)
- Allow editing of image names after upload
- Enhance delete functionality (clicking the image to delete is not ideal UX)
- Add performance improvements (e.g., using `useMemo`, lazy loading with `Suspense`, etc.)

## ⚠️ Notes

- It was unclear whether the image name should come from the file name or a separate input, so I added a custom name input field.
- Backend is a mock API with local file storage (no database or cloud storage).
