import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const MinorLayout = () => {
  return (
    <>
      <Navbar />
     <Outlet />
    </>
  )
}

export default MinorLayout
