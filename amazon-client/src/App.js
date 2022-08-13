import { Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
