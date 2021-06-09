import { BrowserRouter, Route } from 'react-router-dom'
import Home from './pages/home'
import './App.css'
import SignUp from './pages/signup'
import Login from './pages/login';
import Profile from './pages/profile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/login" exact component={Login} />
        <Route path="/profile" exact component={Profile} />
      </BrowserRouter>
    </div>
  );
}

export default App;
