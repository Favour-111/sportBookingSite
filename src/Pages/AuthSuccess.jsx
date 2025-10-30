// Example React useEffect on /auth/success page
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/"); // redirect to dashboard
    } else {
      navigate("/"); // fallback
    }
  }, [navigate]);

  return <p>Logging you in...</p>;
};

export default AuthSuccess;
