import { BrowserRouter, Route } from 'react-router-dom'
import Home from './pages/home'
import './App.css'
import Login from './pages/login'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
      </BrowserRouter>
    </div>
  );
}

export default App;
