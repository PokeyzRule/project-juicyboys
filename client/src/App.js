import { BrowserRouter, Route } from 'react-router-dom'
import './App.css'
import { createContext, useReducer } from 'react'
import HomeHandler from './pages/home'
import Assignment from './pages/assignment';
import CompanyPage from './pages/company';
import CoursePage from './pages/course';
import Login from './pages/login';
import Profile from './pages/profile';
import SignUp from './pages/signup'
import authReducer, { initialState } from './reducers/authReducer'

export const AuthContext = createContext();

function App() {

  const [state, dispatch] = useReducer(authReducer, initialState)

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <BrowserRouter>
          <Route path="/" exact component={HomeHandler} />
          <Route path="/assignment" exact component={Assignment} />
          <Route path="/company/:id" exact component={CompanyPage} />
          <Route path="/course/:id" exact component={CoursePage} />
          <Route path="/course/:cid/assignments/:aid" exact component={Assignment} />
          <Route path="/login" exact component={Login} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/signup" exact component={SignUp} />
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
