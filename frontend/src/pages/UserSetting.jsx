import styles from "../styles/modules/app.module.scss";
import { MdOutlineClose } from "react-icons/md";
import { toast } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUserThunk } from "../store/slices/userSlice";
import { useState } from "react";

const UserSetting = ({ setUserSetting, userSetting }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserThunk());
  }, [userSetting]);
  const userData = useSelector((s) => s.user);
  const [user, setUser] = useState({
    username: userData.username,
    email: userData.email,
  });
  const dropIn = {
    hidden: {
      opacity: 0,
      transform: "scale(0.9)",
    },
    visible: {
      transform: "scale(1)",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      transform: "scale(0.9)",
      opacity: 0,
    },
  };

  const handleLogout = () => {
    axios
      .get("/api/auth/logout")
      .then(() => {
        toast.success("You have been logged out. Login to continue.");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Logout unsuccessful. Try again.");
      });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (userData.username !== user.username || userData.email !== user.email) {
      setUser({ username: user.username, email: user.email });
      axios
        .put("/api/users", user)
        .then((res) => {
          toast.success("Updated Successfully!");
          setUserSetting(false);
        })
        .catch((err) => console.log(err));
    } else toast.error("No changes have been made");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <AnimatePresence>
      <motion.div
        className={styles.wrapper}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className={styles.container}
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            className={styles.closeButton}
            initial={{ top: 40, opacity: 0 }}
            animate={{ top: -10, opacity: 1 }}
            exit={{ top: 40, opacity: 0 }}
            onClick={() => setUserSetting(false)}
          >
            <MdOutlineClose />
          </motion.div>
          <form className={styles.form}>
            <h1 className={styles.formTitle}>User Settings</h1>
            <label htmlFor="name">
              Name
              <input
                type="text"
                id="name"
                name="username"
                value={user.username}
                onChange={handleChange}
                autoFocus
              />
            </label>
            <label htmlFor="email">
              Email
              <input
                type="text"
                id="email"
                name="email"
                className="op-70"
                value={user.email}
                readOnly
                // onChange={handleChange}
              />
            </label>
            <div className={styles.buttonContainer}>
              <button
                className={`${styles.button} ${styles.button__primary}`}
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className={`${styles.button} ${styles.button__secondary}`}
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UserSetting;
