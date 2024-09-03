import { Route, Router, Routes } from 'react-router-dom'
import Home from './pages/Home'
import NavBar from './components/NavBar';
import Aside from './components/Aside';
import Products from './pages/Products';
import EditTemplate from './pages/EditTemplate';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

function App() {

  return (
    <div>
      <NavBar />
      <div className="flex flex-row">
        <Aside />
        <main className="sm:h-[100dvh] w-full pt-[96px] pb-4 px-4 bg-gray-100">
          <Routes>
            <Route path="/login" element={<Login />} />
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/" element={<ProtectedRoute element={<Products />} />} />
            <Route path="/products" element={<ProtectedRoute element={<Products />} />} />
            <Route path="/edit/:id" element={<ProtectedRoute element={<EditTemplate />} />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App;
