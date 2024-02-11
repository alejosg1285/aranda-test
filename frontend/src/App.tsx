import { Navigate, Outlet, useLocation } from 'react-router-dom';
import './App.css';
import { observable } from 'mobx';

function App() {
  const location = useLocation();
  
  return (
    <>
      {location.pathname === '/' ? <Navigate to='/products' replace={true} /> : (
        <Outlet />
      )}
    </>
  );
}

export default App;
