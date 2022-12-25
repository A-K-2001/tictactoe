import logo from './logo.svg';
import './App.css';
import { Home } from './page/Home';
import Register from './page/Register';
import Login from './page/Login';
import Dashboard from './page/Dashboard';
import NewGame from './page/NewGame';
import PlayGame from './page/PlayGame';
import { useSelector } from "react-redux";



import {
  BrowserRouter,
  Routes,
  Route,
  Redirect,
  Navigate
} from "react-router-dom";





function App() {

  const user = useSelector(state=>state.user.currentUser);
  // console.log(user);
  // const user = null;
  
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route path="/login" element={ user? <Navigate to ="/dashboard" /> : <Login/>}/>
      <Route path="/register" element={user? <Navigate to ="/dashboard" /> :<Register/>}/>
      <Route exact path="/dashboard" element={<Dashboard/>}/>
      <Route exact path="/newgame" element={<NewGame/>}/>
      <Route exact path="/playgame/:id" element={<PlayGame/>}/>



      {/* <Dashboard/> */}
      {/* <NewGame/> */}
      {/* <PlayGame/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
