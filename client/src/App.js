import { BrowserRouter, Route } from 'react-router-dom'
import './App.css'
import { createContext, useReducer } from 'react'
import SignUp from './pages/signup'
import Login from './pages/login';
import Profile from './pages/profile';
import CoursePage from './pages/course';
import authReducer, { initialState } from './reducers/authReducer'
import Assignment from './pages/assignment';
import HomeHandler from './pages/home'

export const AuthContext = createContext();

function App() {

  const [state, dispatch] = useReducer(authReducer, initialState)

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <BrowserRouter>
          <Route path="/" exact component={HomeHandler} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/login" exact component={Login} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/course/:id" exact component={CoursePage} />
          <Route path="/assignment" exact component={Assignment} />
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
