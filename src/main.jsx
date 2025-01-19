import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/Home.jsx';

createRoot(document.getElementById('root')).render(
      <BrowserRouter>
        <Routes>
          <Route path='' element={<App/>} />
        </Routes>
      </BrowserRouter>
)
