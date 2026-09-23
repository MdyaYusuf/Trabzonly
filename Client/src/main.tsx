import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './core/store/store'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import { AdminLayout } from './layouts/AdminLayout'
import { PublicLayout } from './layouts/PublicLayout'
import { AdminHubPage } from '@/features/admin/pages/AdminHubPage'
import { AdminPlayerListPage } from '@/features/admin/pages/AdminPlayerListPage'
import { AdminPlayerCreateEditPage } from '@/features/admin/pages/AdminPlayerCreateEditPage'
import { AdminCategoryListPage } from '@/features/admin/pages/AdminCategoryListPage'
import { AdminCategoryCreateEditPage } from '@/features/admin/pages/AdminCategoryCreateEditPage'
import { AdminPositionListPage } from '@/features/admin/pages/AdminPositionListPage'
import { AdminPositionCreateEditPage } from '@/features/admin/pages/AdminPositionCreateEditPage'
import { AdminSeasonListPage } from '@/features/admin/pages/AdminSeasonListPage'
import { AdminSeasonCreateEditPage } from '@/features/admin/pages/AdminSeasonCreateEditPage'
import { HomePage } from './pages/HomePage'
import { LoginPage } from '@/features/auth/pages/LoginPage'
import { RegisterPage } from '@/features/auth/pages/RegisterPage'
import { PlayerDirectoryPage } from '@/features/players/pages/PlayerDirectoryPage'
import { PlayerDetailPage } from '@/features/players/pages/PlayerDetailPage'
import { PostsFeedPage } from '@/features/posts/pages/PostsFeedPage'
import { PostDetailPage } from '@/features/posts/pages/PostDetailPage'
import { PostCreateEditPage } from '@/features/posts/pages/PostCreateEditPage'
import { ProfileSettingsPage } from '@/features/users/pages/ProfileSettingsPage'
import { PublicMemberProfilePage } from '@/features/users/pages/PublicMemberProfilePage'
import { SquadsGalleryPage } from '@/features/squads/pages/SquadsGalleryPage'
import { SquadBuilderPage } from '@/features/squads/pages/SquadBuilderPage'
import { SquadDetailPage } from '@/features/squads/pages/SquadDetailPage'
import { MySquadsPage } from '@/features/squads/pages/MySquadsPage'
import { QuizListPage } from '@/features/quizzes/pages/QuizListPage'
import { TakeQuizPage } from '@/features/quizzes/pages/TakeQuizPage'
import { QuizResultPage } from '@/features/quizzes/pages/QuizResultPage'

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
          {
            path: 'uyeler/:username',
            element: <PublicMemberProfilePage />,
          },
          {
            path: 'kadrolar',
            element: <SquadsGalleryPage />,
          },
          {
            path: 'kadrolar/olustur',
            element: <SquadBuilderPage />,
          },
          {
            path: 'kadrolar/:squadId',
            element: <SquadDetailPage />,
          },
          {
            path: 'kadrolarim',
            element: <MySquadsPage />,
          },
          {
            path: 'quizler',
            element: <QuizListPage />,
          },
          {
            path: 'quizler/:quizId/sonuc',
            element: <QuizResultPage />,
          },
          {
            path: 'quizler/:quizId',
            element: <TakeQuizPage />,
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
        element: <AdminLayout />,
        children: [
          {
            path: 'yonetim',
            element: <AdminHubPage />,
          },
          {
            path: 'yonetim/oyuncular',
            element: <AdminPlayerListPage />,
          },
          {
            path: 'yonetim/oyuncular/yeni',
            element: <AdminPlayerCreateEditPage mode="create" />,
          },
          {
            path: 'yonetim/oyuncular/:playerId/duzenle',
            element: <AdminPlayerCreateEditPage mode="edit" />,
          },
          {
            path: 'yonetim/kategoriler',
            element: <AdminCategoryListPage />,
          },
          {
            path: 'yonetim/kategoriler/yeni',
            element: <AdminCategoryCreateEditPage mode="create" />,
          },
          {
            path: 'yonetim/kategoriler/:categoryId/duzenle',
            element: <AdminCategoryCreateEditPage mode="edit" />,
          },
          {
            path: 'yonetim/pozisyonlar',
            element: <AdminPositionListPage />,
          },
          {
            path: 'yonetim/pozisyonlar/yeni',
            element: <AdminPositionCreateEditPage mode="create" />,
          },
          {
            path: 'yonetim/pozisyonlar/:positionId/duzenle',
            element: <AdminPositionCreateEditPage mode="edit" />,
          },
          {
            path: 'yonetim/sezonlar',
            element: <AdminSeasonListPage />,
          },
          {
            path: 'yonetim/sezonlar/yeni',
            element: <AdminSeasonCreateEditPage mode="create" />,
          },
          {
            path: 'yonetim/sezonlar/:seasonId/duzenle',
            element: <AdminSeasonCreateEditPage mode="edit" />,
          },
        ],
      },
      {
        element: <ProtectedRoute allowedRoles={['Admin']} />,
        children: [
          // Admin-only routes (API-backed)
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
