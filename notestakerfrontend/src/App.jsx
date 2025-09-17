import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import NotesForm from './components/NotesForm'
import Root from './components/Root'
import Notes from './components/Notes'
import HomePage from './components/HomePage'

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Root />,
      children: [
        {
          index: true,
          element: <HomePage />
        },
        {
          path: "/create-note",
          element: <NotesForm />
        },
        {
          path: "/notes",
          element: <Notes />
        }
      ]
    }
  ]
)

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
