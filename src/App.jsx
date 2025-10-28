// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import MinorLayout from './layout/MinorLayout'
import HomePage from './pages/HomePage'
import Shop from './pages/Shop'
import ShowRoom from './pages/ShowRoom'
import SignIn from './pages/SignIn'
import ComingSoon from './pages/ComingSoon'
import Vehicles from './pages/Vehicles'

function App() {
  return (
    <Router>
      <Routes>
        {/* Pages with Navbar + Footer */}

        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/showroom" element={<ShowRoom />} />
          <Route path="/vehicles" element={<Vehicles />} />
        </Route>



        {/* Pages with ONLY Navbar */}
        <Route element={<MinorLayout/>}>
          <Route path="*"element={<ComingSoon />} />
           <Route path="/sign-in" element={<SignIn />} />
        </Route>



        {/* Optional: Pages with NO layout (e.g., fullscreen login) */}
      
      </Routes>
    </Router>
  )
}

export default App