import { Route, Router, Routes } from 'react-router-dom'
import Home from './pages/Home'
import NavBar from './components/NavBar';
import Aside from './components/Aside';
import Products from './pages/Products';

function App() {

  return (
    <div>
      <NavBar />
      <div className="flex flex-row">
        <Aside />
        <main className="h-[100dvh] w-full pt-[96px] px-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App;
