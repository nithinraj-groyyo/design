
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import BasicLayout from './layouts/BasicLayout'

const App = () => {
  return (
    <Routes>
        <Route index element={<Home />} />
    </Routes>
  )
}

export default App