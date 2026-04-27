
  import Home from './pages/Home'
  import Packs from './components/Packs'
  import Error from './pages/Error'
  import Cursor from './components/Cursor'
  import { Routes, Route, BrowserRouter } from 'react-router-dom'
  import MainLayout from './components/MainLayout'
 
  export default function App() {
 
    return (
      <>
        <BrowserRouter>
          <Cursor />

          <Routes>
            <Route path='/' element={<MainLayout />}>
              <Route index element={<Home />} />
             </Route>
            <Route path='*' element={<Error />} />
          </Routes>

        </BrowserRouter>
      </>
    )
  }
