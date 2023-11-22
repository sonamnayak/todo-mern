import { useEffect, useState } from "react";
import axios from "axios";

const useAuth = () => {
  const [auth, setAuth] = useState(null);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("https://todo-mern-backend-vliz.onrender.com/api/auth/is_logged_in");
        setAuth(res.data.isLoggedIn);
      } catch (err) {
        console.log(err);
        setAuth(false);
      }
    };

    checkAuth();
  }, []);

  return { auth };
};

export default useAuth;
