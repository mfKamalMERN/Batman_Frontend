import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import { Home } from './Pages/Home';
import { Login } from './Pages/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MyProfile } from './Pages/MyProfile';
import { Register } from './Pages/Register';

function App() {

  const router = createBrowserRouter([
    { path: '/home', element: <Home /> },
    { path: '/home/:batmanid', element: <Home /> },
    { path: '/', element: <Login /> },
    { path: '/myprofile/:bid', element: <MyProfile /> },
    { path: '/register', element: <Register /> }
  ])

  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
