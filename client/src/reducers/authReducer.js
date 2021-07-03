export const initialState = {
    isAuthenticated: false,
    user: localStorage['user'] ? localStorage['user'] : null,
    token: localStorage['token'] ? localStorage['token'] : null
}

export default function reducer (state = initialState, action) {
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