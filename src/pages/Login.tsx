import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/Contexts/useAuth";
import PageNav from "../components/PageNav";
import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import Message from "../components/Message";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const { logIn, isAuthenticated, errorMessage, dispatch } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) navigate("/app",{replace:true});
  }, [isAuthenticated, navigate]);

  return (
    <main className={styles.login}>
      <PageNav />
      {errorMessage && <Message message={errorMessage} />}

      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          if (email && password) logIn(email, password);
        }}
      >
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => {
              setEmail(e.target.value);
              if (errorMessage) dispatch({ type: "error", payLoad: "" });
            }}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
              if (errorMessage) dispatch({ type: "error", payLoad: "" });
            }}
            value={password}
          />
        </div>

        <div>
          <Button onClick={() => {}} type="primary">
            Log In
          </Button>
        </div>
      </form>
    </main>
  );
}
