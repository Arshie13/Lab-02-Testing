import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Link from '@mui/material/Link'
import Homepage from './components/Homepage'
import AdminPage from './components/AdminPage'
import AddPogs from './components/AddPogs'
// import Market from './components/Market'
import UserPage from './components/UserPage'
import NotFound from './components/errors/NotFound'
import ServerError from './components/errors/ServerError'
import FieldsError from './components/errors/FieldsError'
import Market from './components/Market'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp/>} />
          <Route path="/" element={<Link href="/signin">Nothing here</Link>} />
          <Route path="/home" element={<Homepage/>}/>
          <Route path="/admin" element={<AdminPage/>}/>
          <Route path='/add-pogs' element={<AddPogs/>}/>
          <Route path='/market' element={<Market/>}/>
          <Route path='/userpage' element={<UserPage/>}/>
          <Route path="/not-found" element={<NotFound/>}/>
          <Route path="/server-error" element={<ServerError/>}/>
          <Route path="/error" element={<FieldsError/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
