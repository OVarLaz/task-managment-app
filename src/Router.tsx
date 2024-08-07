import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DashboardPage } from './pages/Dashboard.page';
import { MyTasksPage } from './pages/MyTasks.page';
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
  {
    path: '/my-tasks',
    element: (
      <Layout>
        <MyTasksPage />{' '}
      </Layout>
    ),
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
