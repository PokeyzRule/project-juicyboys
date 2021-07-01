import { BrowserRouter, Route } from 'react-router-dom'
import Home from './pages/home'
import './App.css'
import { createContext, useReducer } from 'react'
import SignUp from './pages/signup'
import Login from './pages/login';
import Profile from './pages/profile';
import CoursePage from './pages/course';
import authReducer, { initialState } from './reducers/authReducer'

export const AuthContext = createContext();

function App() {

  const [state, dispatch] = useReducer(authReducer, initialState)

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <BrowserRouter>
          <Route path="/" exact component={Home} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/login" exact component={Login} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/course/:id" exact component={CoursePage} />
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
