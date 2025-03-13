import { BrowserRouter } from 'react-router-dom'
import Homepage from './Components/Homepage'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <>
      <BrowserRouter>
        <Homepage />
      </BrowserRouter>
    </>
  )
}

export default App
