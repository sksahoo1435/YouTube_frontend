import { useEffect, useState } from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import './App.css';
import Home from './components/Homes/Home';
import Navbar from './components/Navigation/Header/Navbar';
import Sidebar from './components/Navigation/Sidebar/Sidebar';


function RootLayout({ isSidebarCollapsed, toggleSidebar }) {
  return (
    <div className='app_container'>
      <Navbar toggleSidebar={toggleSidebar} />
      <div className='content_container'>
        <Sidebar isCollapsed={isSidebarCollapsed} />
        <main className={`main_content ${isSidebarCollapsed ? 'main_content_collapsed' : 'main_content_expanded'}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function App() {

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(window.innerWidth < 1280);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarCollapsed(window.innerWidth < 1280);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout isSidebarCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
      ],
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
