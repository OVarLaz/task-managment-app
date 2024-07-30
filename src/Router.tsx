import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DashboardPage } from './pages/Dashboard.page';
import Layout from './components/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <DashboardPage />{' '}
      </Layout>
    ),
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
