
import Home from './pages/Home'
// import Packs from './pages/Packs'
import Error from './pages/Error'
import Cursor from './components/Cursor'


import { Routes, Route, BrowserRouter } from 'react-router-dom'

export default function App() {


  return (
    <>
      <BrowserRouter>
          <Cursor />

        <Routes>
          <Route path='/' element={<Home/>}/>
          {/* <Route path='/Packs' element={<Packs/>}/> */}
          <Route path='*' element={<Error/>}/>
        </Routes>


      </BrowserRouter>
    </>
  )
}
