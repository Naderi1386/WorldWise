import { createContext, ReactNode, useReducer } from "react";
// interface UserType {
//   email: string;
//   password: string;
// }
export interface FakeUserType {
  name: string;
  email: string;
  password: string;
  avatar: string;
}
interface contextType {
  user: null | FakeUserType;
  isAuthenticated: boolean;
  logIn: (email: string, password: string) => void;
  logOut: () => void;
  errorMessage: string;
  dispatch: React.Dispatch<ActionType>;
}

export const AuthContext = createContext<null | contextType>(null);

const initialState = {
  user: null,
  isAuthenticated: false,
  errorMessage:'',
};

interface AuthProviderPropType {
  children: ReactNode;
}
interface StateType {
  user: null | FakeUserType;
  isAuthenticated: boolean;
  errorMessage:string;
}
interface ActionLogIn {
  type: "logIn";
  payLoad: FakeUserType;
}
interface ActionLogOut {
  type: "logOut";
  payLoad: string;
}
interface ActionError{
  type:'error'
  payLoad:string
}
type ActionType = ActionLogIn | ActionLogOut | ActionError;
const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "logIn":
      return { ...state, user: action.payLoad, isAuthenticated: true,errorMessage:'' };
    case "logOut":
      return { ...state, user: null, isAuthenticated: false };
    case "error":
      return {...state,errorMessage:action.payLoad}  
    default:
      return state;
  }
};

const FAKE_USER: FakeUserType = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const AuthProvider = ({ children }: AuthProviderPropType) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isAuthenticated, user ,errorMessage} = state;
  const logIn = (email: string, password: string) => {
    if (FAKE_USER.email == email && FAKE_USER.password == password)
      dispatch({ type: "logIn", payLoad: FAKE_USER });
    else{
      dispatch({type:'error',payLoad:'You gave us the wrong informations!'})
    }
  };
  const logOut = () => {
    dispatch({ type: "logOut", payLoad: "byebye" });
  };
  return (
    <AuthContext.Provider value={{ dispatch,isAuthenticated, user, logIn, logOut,errorMessage }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
