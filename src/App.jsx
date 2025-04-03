// src/App.jsx
import StackOverflowClone from './components/StackOverflowClone';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import NewQuestion from './components/NewQuestion';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<StackOverflowClone />} />
          <Route path="/felhasznalok/login" element={<Login />} />
          <Route path="/felhasznalok/regisztracio" element={<Register />} />
          <Route path="/questions/ask" element={<NewQuestion />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;