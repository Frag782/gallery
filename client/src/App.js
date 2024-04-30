import './App.css';
import CharacterPage from './pages/CharacterPage/CharacterPage';
import ModelsPage from './pages/ModelsPage/ModelsPage';
import { Navigate, Route, BrowserRouter as Router, Routes, useParams } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path = '/' element={<Navigate replace to='/home' />} />
          <Route path='/home' element={<ModelsPage />} />
          <Route path='/character/:name' element={<CharacterPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
