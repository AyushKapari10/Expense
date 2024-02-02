import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import SignUp from './SignUp';
import Login from './Login';
import Home from './Home';
import AddExpense from './AddExpense';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/addexpense" element={<AddExpense />} />
    </Routes>
    </BrowserRouter>

  );
}

export default App;
