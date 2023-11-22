import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import styles from "../styles/modules/app.module.scss";

const Login = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    if (!(user.email && user.password))
      return toast.error("All fields are required!");
    axios
      .post("https://todo-mern-backend-vliz.onrender.com/api/auth/login", user)
      .then(() => {
        toast.success("Logged in successfully!");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Login unsuccessful.");
      });
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1 className={styles.formTitle}>Welcome back! Login</h1>
          <label htmlFor="email">
            Email
            <input type="email" id="email" autoFocus />
          </label>
          <label htmlFor="password">
            Password
            <input type="password" id="password" />
          </label>
          <div className={styles.buttonContainer}>
            <button className={`${styles.button} ${styles.button__primary}`}>
              Login
            </button>
          </div>
          <p className={styles.auth_routes}>
            New user?{" "}
            <span onClick={() => navigate("/register")}>Register</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
