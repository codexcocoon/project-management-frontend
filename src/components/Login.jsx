import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {login} = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const response = await api.post("/login", {
        email,
        password,
      });
      const token = response.data.token;
      const user = response.data.user;

    //   localStorage.setItem("token", token);
    //   localStorage.setItem("user", JSON.stringify(user));
      //   setMessage(response.data.message);
      login(token,user);
      toast.success(response.data.message);
      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.data.message) {
        // setMessage(error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-gray-500 w-full max-w-[340px] mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Log In
        </h2>

        <input
          id="email"
          className="w-full border mt-1 bg-indigo-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />

        <input
          id="password"
          className="w-full border mt-1 bg-indigo-500/5 mb-7 border-gray-500/10 outline-none rounded py-2.5 px-3"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />

        <button className="w-full mb-3 bg-indigo-500 hover:bg-indigo-600 transition-all active:scale-95 py-2.5 rounded text-white font-medium">
          {loading ? "submitting" : "Log in"}
        </button>
        {/* {message && <p>{message}</p>} */}
        <p className="text-center mt-4">
          Don't have an account?
          <Link to="/register" className="text-blue-500 underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
