import { Route, Router, Routes } from 'react-router-dom'
import Home from './pages/Home'
import NavBar from './components/NavBar';
import Aside from './components/Aside';

function App() {

  return (
    <>
      <NavBar />
      <Aside />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  )
}

export default App;
