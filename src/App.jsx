import { Route, Routes } from 'react-router-dom'
import Home from './assets/components/Home'
import Navbar from './assets/components/Navbar'
import Footer from './assets/components/Footer'
import Login from './assets/components/Login'
import Register from './assets/components/Register'
import DashBoard from './assets/components/DashBoard'
import { GlobalContextProvider } from './assets/context/GlobalContext'

const App = () => {



  return (
    <div className='bg-bg text-text1 min-h-[100vh] flex justify-center    flex-col'>
      <GlobalContextProvider>

        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          <Route path='/dashboard' element={
            <DashBoard />
          } />
        </Routes>
        <Footer />
      </GlobalContextProvider>
    </div>
  )
}

export default App