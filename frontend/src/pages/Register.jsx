import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../styles/modules/app.module.scss";

const Register = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      name: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    if (!(user.name && user.email && user.password))
      return toast.error("All fields are required!");
    axios
      .post(
        "https://todo-mern-backend-vliz.onrender.com/api/auth/register",
        user,
        { withCredentials: true }
      )
      .then(() => {
        toast.success("Registered successfully! Login to continue.");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Registration unsuccessful.");
      });
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1 className={styles.formTitle}>Welcome! Register</h1>
          <label htmlFor="username">
            Name
            <input type="text" id="username" autoFocus />
          </label>
          <label htmlFor="email">
            Email
            <input type="email" id="email" />
          </label>
          <label htmlFor="password">
            Password
            <input type="password" id="password" />
          </label>
          <div className={styles.buttonContainer}>
            <button className={`${styles.button} ${styles.button__primary}`}>
              Register
            </button>
          </div>
          <p className={styles.auth_routes}>
            Existing user? <span onClick={() => navigate("/login")}>Login</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
