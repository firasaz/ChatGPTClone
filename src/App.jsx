import { createBrowserRouter, RouterProvider } from "react-router-dom"
import MainLayout from "./Layouts/MainLayout"
import NotFoundPage from "./components/NotFoundPage"
import NewChat from "./pages/NewChat"

function App() {
  const routes = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      errorElement: <NotFoundPage />,
      children: [
        {
          path: '/',
          element: <NewChat />
        }
      ]
    }
  ])

  return (
    <RouterProvider router={routes} />
  )
}

export default App
