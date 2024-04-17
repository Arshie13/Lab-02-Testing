import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Link from '@mui/material/Link'
import Navbar from './components/Navbar'
import Homepage from './components/Homepage'
import AdminPage from './components/AdminPage'
import AddPogs from './components/AddPogs'
import Market from './components/Market'
import Test from './components/Test'
import UserPage from './components/UserPage'
import BuyPogs from './components/BuyPogs'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp/>} />
          <Route path="/" element={<Link href="/signin">Nothing here</Link>} />
          <Route path="/navbartest" element={<Navbar/>} />
          <Route path="/home" element={<Homepage/>}/>
          <Route path="/admin" element={<AdminPage/>}/>
          <Route path='/add-pogs' element={<AddPogs/>}/>
          <Route path='/market' element={<Market/>}/>
          <Route path='/test' element={<Test/>}/>
          <Route path='/userpage' element={<UserPage/>}/>
          <Route path='/buy-pogs' element={<BuyPogs/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
