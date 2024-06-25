import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './routes/Home';
import Datapromotion from './routes/Datapromotion';
import Statistics from './routes/Statistics';
import Datatrivia from './routes/Datatrivia';
import CreateInfo from './components/Create_info';
import CreateTrivia from './components/Create_trivid';
import Login from './routes/Login';
import Signup from './routes/SignUp';
import EditInfo from './components/Edit_info';
import Edittrivia from './components/Edit_trivia';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/infomation/promotion" element={<Datapromotion/>}/>
          <Route path="/infomation/trivia" element={<Datatrivia/>}/>
          <Route path="/statistics" element={<Statistics/>}/>
          <Route path="/create/infomation" element={<CreateInfo/>}/>
          <Route path="/create/trivia" element={<CreateTrivia/>}/>
          <Route path="/edit/infomation/:id" element={<EditInfo/>}/>
          <Route path="/edit/trivia/:id" element={<Edittrivia/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
