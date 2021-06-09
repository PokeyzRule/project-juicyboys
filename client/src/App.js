import { BrowserRouter, Route } from 'react-router-dom'
import Home from './pages/home'
import './App.css'
import { createContext, useReducer } from 'react'
import SignUp from './pages/signup'
import Login from './pages/login';

export const AuthContext = createContext();
const initialState = {
    isAuthenticated: false,
    user: localStorage['user'] ? localStorage['user'] : null,
    token: localStorage['token'] ? localStorage['token'] : null
}

const reducer = (state, action) => {
  switch (action.type) {
      case "LOGIN":
          localStorage.setItem("user", JSON.stringify(action.payload.user));
          localStorage.setItem("token", JSON.stringify(action.payload.token));
          return {
              ...state,
              isAuthenticated: true,
              user: action.payload.user,
              token: action.payload.token
          }
      case "LOGOUT":
          localStorage.clear();
          return {
              ...state,
              isAuthenticated: false,
              user: null
          }
      default: 
          return state;
  }
}

function App() {

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
    <div className="App">
      <BrowserRouter>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/login" exact component={Login} />
      </BrowserRouter>
    </div>
    </AuthContext.Provider>
  );
}

export default App;
