import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './core/store/store'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import { PublicLayout } from './layouts/PublicLayout'
import { HomePage } from './pages/HomePage'
import { LoginPage } from '@/features/auth/pages/LoginPage'
import { RegisterPage } from '@/features/auth/pages/RegisterPage'
import { PlayerDirectoryPage } from '@/features/players/pages/PlayerDirectoryPage'
import { PlayerDetailPage } from '@/features/players/pages/PlayerDetailPage'
import { PostsFeedPage } from '@/features/posts/pages/PostsFeedPage'
import { PostDetailPage } from '@/features/posts/pages/PostDetailPage'
import { PostCreateEditPage } from '@/features/posts/pages/PostCreateEditPage'
import { ProfileSettingsPage } from '@/features/users/pages/ProfileSettingsPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <PublicLayout />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: 'login',
            element: <LoginPage />,
          },
          {
            path: 'register',
            element: <RegisterPage />,
          },
          {
            path: 'oyuncular',
            element: <PlayerDirectoryPage />,
          },
          {
            path: 'oyuncular/:playerId',
            element: <PlayerDetailPage />,
          },
          {
            path: 'gonderiler',
            element: <PostsFeedPage />,
          },
          {
            path: 'gonderiler/yeni',
            element: <PostCreateEditPage mode="create" />,
          },
          {
            path: 'gonderiler/:postId/duzenle',
            element: <PostCreateEditPage mode="edit" />,
          },
          {
            path: 'gonderiler/:postId',
            element: <PostDetailPage />,
          },
          {
            path: 'profil',
            element: <ProfileSettingsPage />,
          },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          // Authenticated member routes
        ],
      },
      {
        element: <ProtectedRoute allowedRoles={['Admin']} />,
        children: [
          // Admin-only routes
        ],
      },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
