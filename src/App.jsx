import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './Layouts/MainLayout'
import NotFoundPage from './components/NotFoundPage'
import ChatWrapper from './pages/ChatWrapper'
import { ChatProvider } from '@/context/ChatContext'

function App() {
  const routes = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      errorElement: <NotFoundPage />,
      children: [
        {
          path: '/',
          element: (
            <ChatProvider>
              <ChatWrapper />
            </ChatProvider>
          ),
        },
      ],
    },
  ])

  return <RouterProvider router={routes} />
}

export default App
