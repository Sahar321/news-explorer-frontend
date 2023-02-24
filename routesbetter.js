import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Import your components
const Main = lazy(() => import('./Main'));
const SavedArticles = lazy(() => import('./SavedArticles'));
const PageNotFound = lazy(() => import('./PageNotFound'));
const ProtectedRoutes = lazy(() => import('./ProtectedRoutes'));

// Define your route configuration
const routes = [
  {
    path: '/',
    element: <Main onCardBookmarkClick={handleCardBookmarkClick} /*...other props*/ />,
  },
  {
    path: '/signin',
    element: <Navigate to="/" state={{ shouldOpenSignInPopup: true }} />,
  },
  {
    path: '/signup',
    element: <Navigate to="/" state={{ shouldOpenSignUpPopup: true }} />,
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
  {
    path: '/SavedArticles',
    element: (
      <ProtectedRoutes loggedIn={loggedIn}>
        <SavedArticles onCardRemoveClick={handleCardRemove} /*...other props*/ />
      </ProtectedRoutes>
    ),
  },
];

// Render your routes
function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Suspense>
  );
}
